import axios from "axios";

const API_URL = "http://127.0.0.1:8000/appointments/";

// Create a appointments
export const createAppointments = (appointmentsData) => axios.post(`${API_URL}`, appointmentsData);

// Get all appointments
export const getAppointments = () => axios.get(`${API_URL}list/`);

// Update a appointments
export const updateAppointments = (id, appointmentsData) => axios.put(`${API_URL}${id}/`, appointmentsData);

// Delete a appointments
export const deleteAppointments = (id) => axios.delete(`${API_URL}${id}/`);
