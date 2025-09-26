import React, { useState } from 'react';
import {showValidationAlert} from '../utils/alertUtils';

export default function TaskForm({ onCreate }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  // Función para obtener la fecha de hoy en formato 'YYYY-MM-DD'
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  // Se obtiene la fecha mínima permitida (hoy)
  const today = getTodayDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de Título
    if (!newTaskTitle.trim()) {
      showValidationAlert('Título Requerido', 'El título de la tarea no puede estar vacío.'); 
      return;
    }

    if (newDueDate && newDueDate < today) {
      showValidationAlert('Fecha Inválida', 'La fecha límite debe ser hoy o en el futuro.', 'error');
      return;
    }

    const finalDueDate = newDueDate ? newDueDate : null;

    onCreate(newTaskTitle, newDescription, finalDueDate); 

    setNewTaskTitle('');
    setNewDescription('');
    setNewDueDate('');
  };


  return (
    <form onSubmit={handleSubmit} >
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Campo Título */}
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Título de la tarea (Obligatorio)..."
          className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-isologic-blue"
        />
        {/* Campo Fecha Límite */}
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          min={today} 
          className="w-full md:w-auto border p-2 rounded focus:outline-none focus:ring-2 focus:ring-isologic-blue"
        />
      </div>

      {/* Campo Descripción */}
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Descripción (Opcional)..."
        rows="2"
        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-isologic-blue resize-none"
      />
      
      {/* Botón Añadir */}
      <button
        type="submit"
        className="bg-highlight text-isologic-darkgray w-full px-4 py-2 rounded hover:bg-yellow-500 font-bold"
      >
        Añadir Tarea
      </button>
    </form>
  );
}