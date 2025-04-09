import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    accessToken: localStorage.getItem("access_token") || "",
    refreshToken: localStorage.getItem("refresh_token") || "",
    userProfile: null,
  });
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Profile fetch failed", error);
      return null;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        email,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      const profile = await fetchProfile(access);
      
      setAuthData({
        accessToken: access,
        refreshToken: refresh,
        userProfile: profile,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      return { success: true, profile };
    } catch (error) {
      setError("Invalid email or password");
      return { success: false };
    }
  };

  const refreshToken = useCallback(async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) return;

      const response = await axios.post("http://localhost:8000/api/token/refresh/", {
        refresh,
      });
      const { access } = response.data;

      localStorage.setItem("access_token", access);
      const profile = await fetchProfile(access);
      
      setAuthData(prev => ({
        ...prev,
        accessToken: access,
        userProfile: profile
      }));
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setAuthData({
        accessToken: "",
        refreshToken: "",
        userProfile: null,
      });
    }
  }, [fetchProfile]);

  useEffect(() => {
    if (authData.accessToken && !authData.userProfile) {
      fetchProfile(authData.accessToken).then(profile => {
        setAuthData(prev => ({ ...prev, userProfile: profile }));
      });
    }
  }, [authData.accessToken, authData.userProfile, fetchProfile]);

  useEffect(() => {
    if (authData.refreshToken) {
      const interval = setInterval(refreshToken, 1000 * 60 * 14);
      return () => clearInterval(interval);
    }
  }, [authData.refreshToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ authData, login, error, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);