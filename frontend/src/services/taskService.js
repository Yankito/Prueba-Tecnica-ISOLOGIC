// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

const getTasks = async () => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createTask = async (title, description, dueDate) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, dueDate })
  });
  if (!response.ok) {
    // Si el error es 400 (Bad Request), podemos intentar leer el mensaje del backend
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Error desconocido al crear la tarea.';
    
    // Lanza el error para que el bloque catch del componente lo capture.
    throw new Error(errorMessage);
  }

  return response.json();
};

const updateTask = async (id, isCompleted) => {
    const token = localStorage.getItem('access_token');
    const response = await axios.put(`${API_URL}/${id}`, { isCompleted }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const deleteTask = async (id) => {
  const token = localStorage.getItem('access_token');
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};