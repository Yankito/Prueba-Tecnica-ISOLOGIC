import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; 
const TASKS_API_URL = API_BASE_URL + '/tasks'; // La ruta de tareas es /tasks

// Petición GET: Obtener todas las tareas del usuario
const getTasks = async () => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(TASKS_API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Petición POST: Crear una nueva tarea
const createTask = async (title, description, dueDate) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${TASKS_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, dueDate })
  });
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Error desconocido al crear la tarea.';
    
    throw new Error(errorMessage);
  }

  return response.json();
};

// Petición PUT: Actualizar el estado de una tarea
const updateTask = async (id, isCompleted) => {
    const token = localStorage.getItem('access_token');
    const response = await axios.put(`${TASKS_API_URL}/${id}`, { isCompleted }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Petición DELETE: Eliminar una tarea
const deleteTask = async (id) => {
  const token = localStorage.getItem('access_token');
  await axios.delete(`${TASKS_API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};