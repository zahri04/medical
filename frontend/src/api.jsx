import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Adjust according to your Django server

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication API
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register/", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

// Doctor APIs
export const acceptAppointment = async (appointmentId) => {
  try {
    const response = await api.post(`/doctor/accept_appointment/${appointmentId}/`);
    return response.data;
  } catch (error) {
    console.error("Accept appointment error:", error.response?.data || error.message);
    throw error;
  }
};

export const rejectAppointment = async (appointmentId) => {
  try {
    const response = await api.post(`/doctor/reject_appointment/${appointmentId}/`);
    return response.data;
  } catch (error) {
    console.error("Reject appointment error:", error.response?.data || error.message);
    throw error;
  }
};

export const getPatientInfo = async (patientId) => {
  try {
    const response = await api.get(`/doctor/patient/${patientId}/`);
    return response.data;
  } catch (error) {
    console.error("Patient info error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAppointmentDetails = async (appointmentId) => {
  try {
    const response = await api.get(`/doctor/appointment/${appointmentId}/`);
    return response.data;
  } catch (error) {
    console.error("Appointment details error:", error.response?.data || error.message);
    throw error;
  }
};

// Patient APIs
export const patientAction = async (action, patientData) => {
  try {
    const response = await api.post(`/patient/${action}/`, patientData);
    return response.data;
  } catch (error) {
    console.error("Patient action error:", error.response?.data || error.message);
    throw error;
  }
};

// Assistant APIs
export const assistantAction = async (action, assistantData) => {
  try {
    const response = await api.post(`/assistant/${action}/`, assistantData);
    return response.data;
  } catch (error) {
    console.error("Assistant action error:", error.response?.data || error.message);
    throw error;
  }
};

// Dashboard APIs
export const getDoctorDashboard = async () => {
  try {
    const response = await api.get(`/dashboard/doctor/`);
    return response.data;
  } catch (error) {
    console.error("Doctor dashboard error:", error.response?.data || error.message);
    throw error;
  }
};

export const getPatientDashboard = async () => {
  try {
    const response = await api.get(`/dashboard/patient/`);
    return response.data;
  } catch (error) {
    console.error("Patient dashboard error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAssistantDashboard = async () => {
  try {
    const response = await api.get(`/dashboard/assistant/`);
    return response.data;
  } catch (error) {
    console.error("Assistant dashboard error:", error.response?.data || error.message);
    throw error;
  }
};
