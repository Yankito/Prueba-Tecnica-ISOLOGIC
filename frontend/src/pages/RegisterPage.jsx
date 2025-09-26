import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authService.register(username, password);
      navigate('/tasks'); 
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al registrar. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-xl rounded-lg max-w-sm w-full">
        <h3 className="text-2xl font-bold text-center text-isologic-darkgray">
            Crear Cuenta
        </h3>
        {error && <p className="text-error text-sm mt-2">{error}</p>}
        
        <form onSubmit={handleRegister}>
          <div className="mt-4">
            <div>
              <label className="block text-isologic-darkgray" htmlFor="username">
                Usuario
              </label>
              <input 
                type="text" 
                placeholder="Usuario"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-isologic-blue"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-isologic-darkgray" htmlFor="password">
                Contraseña
              </label>
              <input 
                type="password" 
                placeholder="Contraseña"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-isologic-blue"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-center mt-4">
              <button 
                type="submit"
                className="px-6 py-2 text-white bg-isologic-green rounded-lg hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-isologic-green"
              >
                Registrar
              </button>
            </div>
          </div>
        </form>
        
        <p className="mt-4 text-center text-gray-600 text-sm">
          ¿Ya tienes una cuenta? 
          <div>
            <Link 
                to="/" 
                className="text-isologic-blue hover:underline"
            >
                Inicia sesión
            </Link>
          </div>
        </p>
      </div>
    </div>
  );
}