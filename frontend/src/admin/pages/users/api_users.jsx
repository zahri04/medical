import axios from "axios";

const API_URL = "http://127.0.0.1:8000/users/";

// Create a user
export const createUser = (userData) => axios.post(`${API_URL}list/`, userData);

// Get all users
export const getUsers = () => axios.get(`${API_URL}list/`);

// Update a user
export const updateUser = (id, userData) => axios.put(`${API_URL}${id}/`, userData);

// Delete a user
export const deleteUser = (id) => axios.delete(`${API_URL}${id}/`);
