import React, { useState } from 'react';

import TaskForm from './TaskForm'

import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';  


export default function CollapsibleTaskForm({ onCreate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleTaskCreated = (...args) => {
    onCreate(...args);
    setIsOpen(false); 
  };

  return (
    <div className="mb-4 bg-white rounded-lg shadow-md border border-gray-200">
      
      {/* Cabecera del Desplegable */}
      <button
        onClick={toggleOpen}
        className="w-full p-4 flex justify-between items-center text-isologic-darkgray font-semibold hover:bg-gray-50 transition duration-150"
      >
        <span className="flex items-center text-lg">
          {/* Icono Principal (Suma o Flecha Arriba) */}
          {isOpen 
                ? <IoChevronUp className="w-5 h-5 mr-2 text-isologic-blue" /> 
                : <FaPlus className="w-4 h-4 mr-2 text-isologic-green" /> 
            }
          {isOpen ? 'Ocultar Formulario' : 'Añadir Nueva Tarea'}
        </span>
        
        {/* Icono Indicador de Estado (Flecha Arriba o Abajo) */}
        {isOpen ? <IoChevronUp className="w-6 h-6 text-gray-500" /> : <IoChevronDown className="w-6 h-6 text-gray-500" />}
      </button>

      {/* Contenido del Desplegable */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t border-gray-200">
          <TaskForm onCreate={handleTaskCreated} />
        </div>
      </div>
    </div>
  );
}
