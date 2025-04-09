import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

// Create a Doctor
export const createDoctor = (DoctorData) => axios.post(`${API_URL}doctors/`, DoctorData);

// Get all doctors
export const getdoctors = () => axios.get(`${API_URL}doctors/list/`);

// Update a Doctor
export const updateDoctor = (id, DoctorData) => axios.put(`${API_URL}doctors/${id}/`, DoctorData);

// Delete a Doctor
export const deleteDoctor = (id) => axios.delete(`${API_URL}doctors/${id}/`);
