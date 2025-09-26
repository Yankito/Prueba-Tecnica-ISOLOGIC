import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'; 
import TasksDashboardPage from './pages/TasksDashboardPage.jsx'; 
import RegisterPage from './pages/RegisterPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<TasksDashboardPage />} />
      </Routes>
    </Router>
  );
}