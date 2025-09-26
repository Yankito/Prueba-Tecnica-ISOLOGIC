import React, { useState, useEffect, useCallback, useMemo } from 'react';
import taskService from '../services/taskService';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import TaskItem from '../components/TaskItem';
import { showAlert, showToast } from '../utils/alertUtils';
import CollapsibleTaskForm from '../components/CollapsibleTaskForm'; 

import { MdLogout } from 'react-icons/md'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; 

export default function TasksDashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [sortKey, setSortKey] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const username = authService.getCurrentUsername(); 

  // Función para obtener tareas
  const fetchTasks = useCallback(async () => {
    setIsLoading(true); 
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      // Asume que si falla, el token expiró o es inválido
      showAlert('error', 'Sesión Expirada', 'Tu sesión ha terminado. Por favor, inicia sesión de nuevo.');
      authService.logout();
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/');
      return;
    }
    fetchTasks();
  }, [navigate, fetchTasks]);

  
  const handleCreateTask = async (title, description, dueDate) => {
    setIsLoading(true);
    try {
      const newTask = await taskService.createTask(title, description, dueDate);
      setTasks(prevTasks => [newTask, ...prevTasks]); 
      showAlert('success', 'Tarea Creada', `La tarea "${title}" ha sido añadida con éxito.`);
    } catch (error) {
      showAlert('error', 'Error al crear', 'No se pudo crear la tarea. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }

  };

  const handleUpdateTask = async (id, isCompleted) => {
    try {
      await taskService.updateTask(id, !isCompleted);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, isCompleted: !isCompleted } : task
        )
      );

      const action = isCompleted ? 'deshecha' : 'completada';
      showToast('success', `Tarea marcada como ${action}.`);
        
    } catch (error) {
      showAlert('error', 'Error al actualizar', 'No se pudo actualizar la tarea. Verifica tu conexión.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      showAlert('success', 'Tarea Eliminada', 'La tarea se eliminó correctamente.');
    } catch (error) {
      showAlert('error', 'Error al eliminar', 'No se pudo eliminar la tarea. Podría no existir o no te pertenece.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      // Si es la misma clave, cambia la dirección
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es una nueva clave, establece esa clave y dirección ascendente por defecto
      setSortKey(key);
      setSortDirection('asc');
    }
  };
  
  // Función principal que clasifica las tareas
  const sortedTasks = useMemo(() => {
    const sorted = [...tasks]; 

    sorted.sort((a, b) => {
      let comparison = 0;
      let aValue, bValue;

      switch (sortKey) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'isCompleted':
          aValue = a.isCompleted ? 1 : 0;
          bValue = b.isCompleted ? 1 : 0;
          break;
        case 'dueDate':
        default:
          aValue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          bValue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          break;
      }

      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
      // Aplica la dirección
      return sortDirection === 'desc' ? comparison * -1 : comparison;
    });

    return sorted;
  }, [tasks, sortKey, sortDirection]);

  const SortIcon = ({ keyName }) => {
    if (sortKey !== keyName) {
      return <FaSort className="ml-1 w-3 h-3 text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <FaSortUp className="ml-1 w-3 h-3 text-isologic-darkgray" />;
    }
    return <FaSortDown className="ml-1 w-3 h-3 text-isologic-darkgray" />;
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
        
        {/* Botones de ordenamiento */}
        <div className="bg-white p-4 rounded-t-lg shadow-md mb-0 flex space-x-4 border-b border-gray-200">
          <span className="text-sm font-semibold text-isologic-darkgray mr-2">Ordenar por:</span>
          
          <button 
            onClick={() => handleSort('title')} 
            className="flex items-center text-isologic-blue hover:text-isologic-darkgray text-sm font-medium transition"
            disabled={isLoading}
          >
            Título <SortIcon keyName="title" />
          </button>

          <button 
            onClick={() => handleSort('dueDate')} 
            className="flex items-center text-isologic-blue hover:text-isologic-darkgray text-sm font-medium transition"
            disabled={isLoading}
          >
            Fecha Límite <SortIcon keyName="dueDate" />
          </button>

          <button 
            onClick={() => handleSort('isCompleted')} 
            className="flex items-center text-isologic-blue hover:text-isologic-darkgray text-sm font-medium transition"
            disabled={isLoading}
          >
            Estado <SortIcon keyName="isCompleted" />
          </button>
        </div>
        
        {/* Lista de Tareas */}
        <ul className="bg-white rounded-b-lg shadow-md divide-y divide-gray-200 mt-0">
          {isLoading ? ( // <-- IMPLEMENTACIÓN DEL LOADING
            <li className="p-4 text-center text-isologic-darkgray flex justify-center items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-isologic-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando tareas...
            </li>
          ) : sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
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