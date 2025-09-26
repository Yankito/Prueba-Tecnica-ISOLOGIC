import React from 'react';
import { showConfirmAlert } from '../utils/alertUtils'; 

import { FaCheckCircle } from 'react-icons/fa';
import { IoMdUndo } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FiAlertTriangle } from 'react-icons/fi';  

// Recibe la tarea y los manejadores de eventos como props
export default function TaskItem({ task, onUpdate, onDelete }) {
  const { id, title, description, dueDate, isCompleted } = task;

  const isDueToday = () => {
    if (!dueDate || isCompleted) return false;
      
    // Formato para comparación (YYYY-MM-DD)
    const taskDate = new Date(dueDate).toISOString().split('T')[0];
    const todayDate = new Date().toISOString().split('T')[0];
      
    return taskDate === todayDate;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha límite';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const dueToday = isDueToday();

  const handleDeleteClick = async () => {
    const isConfirmed = await showConfirmAlert(
      '¿Estás seguro?',
      `Vas a eliminar la tarea: "${title}". ¡Esta acción es irreversible!`
    );

    if (isConfirmed) {
      // Si el usuario confirma, llamamos al manejador de eliminación
      onDelete(id);
    }
  };

  return (
    <li className="p-4 flex justify-between items-start">
      <div className="flex-1 min-w-0 pr-4">
        {/* Título */}
        <p className={`font-semibold text-lg ${isCompleted ? 'line-through text-gray-500' : 'text-isologic-darkgray'}`}>
          {title}
        </p>
        
        {/* Descripción */}
        {description && (
          <p className="text-sm text-gray-600 truncate">{description}</p>
        )}
        
        {/* Fecha Límite */}
        <p 
          className={`text-xs mt-1 flex items-center ${
            dueToday && !isCompleted ? 'text-highlight font-bold' : 'text-isologic-blue' // Resalta texto si vence hoy
          }`}
        >
          {dueToday && !isCompleted && 
            <FiAlertTriangle className="w-4 h-4 text-highlight flex-shrink-0 mr-1" />
          }
      
          Fecha Límite: {formatDate(dueDate)}
        </p>
      </div>
      
      {/* Botones de acción */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          onClick={() => onUpdate(id, isCompleted)}
          className={`px-3 py-1 text-sm rounded flex items-center ${
            isCompleted
              ? 'bg-yellow-500 hover:bg-yellow-700'
              : 'bg-green-500 hover:bg-green-700'
          } text-white`}
        >
          {isCompleted 
            ? <IoMdUndo className="w-4 h-4 mr-1" />
            : <FaCheckCircle className="w-4 h-4 mr-1" />
          }
          {isCompleted ? 'Deshacer' : 'Completar'}
        </button>

        <button
          onClick={handleDeleteClick} 
          className="bg-error text-white px-3 py-1 text-sm rounded hover:bg-red-700 flex items-center"
        >
          <MdDelete className="w-4 h-4 mr-1" />
          Eliminar
        </button>
      </div>
    </li>
  );
}