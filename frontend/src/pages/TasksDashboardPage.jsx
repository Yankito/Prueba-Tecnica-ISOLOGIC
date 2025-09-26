import React, { useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import TaskItem from '../components/TaskItem';
import { showAlert, showToast } from '../utils/alertUtils';
import CollapsibleTaskForm from '../components/CollapsibleTaskForm'; 

import { MdLogout } from 'react-icons/md'

export default function TasksDashboardPage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const username = authService.getCurrentUsername(); 

  // Función para obtener tareas (usamos useCallback para eficiencia con useEffect)
  const fetchTasks = useCallback(async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      // Asume que si falla, el token expiró o es inválido.
      showAlert('error', 'Sesión Expirada', 'Tu sesión ha terminado. Por favor, inicia sesión de nuevo.');
      authService.logout();
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/');
      return;
    }
    fetchTasks();
  }, [navigate, fetchTasks]);

  // Manejadores de Eventos del Componente Principal
  
  const handleCreateTask = async (title, description, dueDate) => {
    try {
      await taskService.createTask(title, description, dueDate);
      fetchTasks();
      showAlert('success', 'Tarea Creada', `La tarea "${title}" ha sido añadida con éxito.`);
    } catch (error) {
      // Muestra alerta si falla la creación (ej: error de servidor)
      showAlert('error', 'Error al crear', 'No se pudo crear la tarea. Intenta de nuevo.');
    }
  };

  const handleUpdateTask = async (id, isCompleted) => {
    try {
      await taskService.updateTask(id, !isCompleted);
      fetchTasks();
      
      const action = isCompleted ? 'deshecha' : 'completada';
      
      showToast('success', `Tarea marcada como ${action}.`);
        
    } catch (error) {
      showAlert('error', 'Error al actualizar', 'No se pudo actualizar la tarea. Verifica tu conexión.');
    }
    };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
      showAlert('success', 'Tarea Eliminada', 'La tarea se eliminó correctamente.');
    } catch (error) {
      showAlert('error', 'Error al eliminar', 'No se pudo eliminar la tarea. Podría no existir o no te pertenece.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

return (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-isologic-blue text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Mis Tareas</h1>
          {username && <p className="text-sm text-gray-300">Usuario: {username}</p>}
        </div>
        <button
          onClick={handleLogout}
          className="bg-error text-white px-4 py-2 rounded hover:bg-red-700 flex items-center" 
        >
          <MdLogout className="w-5 h-5 mr-2" />
          Cerrar Sesión
        </button>
      </div>
    </header>
    
    <main className="container mx-auto p-4 mt-8">
      <CollapsibleTaskForm onCreate={handleCreateTask} />
      
      {/* Lista de Tareas */}
      <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        {tasks.length > 0 ? (
          tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task}
            onUpdate={handleUpdateTask} 
            onDelete={handleDeleteTask}
          />
          ))
        ) : (
          <li className="p-4 text-center text-gray-500">No hay tareas. ¡Añade una!</li>
        )}
      </ul>
    </main>
  </div>
 );
}