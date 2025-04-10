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

  // Modified fetchProfile: Throw error instead of returning it
  const fetchProfile = useCallback(async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;  // Propagate error to be caught in the login function
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Get tokens from login endpoint
      const response = await axios.post("http://localhost:8000/api/token/", { email, password });
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      let profile;
      try {
        // Attempt to fetch the profile with the access token
        profile = await fetchProfile(access);
      } catch (profileError) {
        // Extract message from profile error response if available
        const errorMessage =
          (profileError.response && profileError.response.data && profileError.response.data.error) ||
          "Profile fetch error.";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      // If profile fetch was successful, update authData and defaults
      setAuthData({
        accessToken: access,
        refreshToken: refresh,
        userProfile: profile,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      
      return { success: true, profile };
    } catch (loginError) {
      // Error during the token fetching (login) process
      console.log(loginError);
      const errorMessage =
        (loginError.response && loginError.response.data && loginError.response.data.error) ||
        "An unexpected error occurred.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const refreshToken = useCallback(async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) return;

      const response = await axios.post("http://localhost:8000/api/token/refresh/", { refresh });
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
      }).catch(() => {}); // Optionally handle errors here
    }
  }, [authData.accessToken, authData.userProfile, fetchProfile]);

  useEffect(() => {
    if (authData.refreshToken) {
      const interval = setInterval(refreshToken, 1000 * 60 * 14);
      return () => clearInterval(interval);
    }
  }, [authData.refreshToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ authData, login, error, setAuthData, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
