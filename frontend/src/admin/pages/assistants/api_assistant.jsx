import axios from "axios";

const API_URL = "http://127.0.0.1:8000/assistants/";

// Create a assistant
export const createAssistant = (assistantData) => axios.post(`${API_URL}list/`, assistantData);

// Get all assistants
export const getAssistants = () => axios.get(`${API_URL}list/`);

// Update a assistant
export const updateAssistant = (id, assistantData) => axios.put(`${API_URL}${id}/`, assistantData);

// Delete a assistant
export const deleteAssistant = (id) => axios.delete(`${API_URL}${id}/`);
