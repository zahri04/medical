import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

// Create a patient
export const createpatient = (patientdata) => axios.post(`${API_URL}patients/list/`, patientdata);

// Get all patients
export const getpatients = () => axios.get(`${API_URL}patients/list/`);

// Update a patient
export const updatepatient = (id, patientdata) => axios.put(`${API_URL}patients/${id}/`, patientdata);

// Delete a patient
export const deletepatient = (id) => axios.delete(`${API_URL}patients/${id}/`);
