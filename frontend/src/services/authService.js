import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; 
const USERS_API_URL = API_BASE_URL + '/auth'; // La ruta de autenticación es /auth

const login = async (username, password) => {
  const response = await axios.post(USERS_API_URL + '/login', { username, password });
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('username', username);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('username'); 
};

const register = async (username, password) => {
  const response = await axios.post(USERS_API_URL + '/register', { username, password });
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('username', username);
  }

  return response.data;
};

const getCurrentUsername = () => {
    return localStorage.getItem('username');
}

export default {
  login,
  logout,
  register,
  getCurrentUsername
};