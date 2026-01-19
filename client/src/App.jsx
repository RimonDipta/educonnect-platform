import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

// Placeholder Pages
const Home = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">
      Welcome to EduConnect 🎓
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      Connect with senior students for instant academic guidance. Real-time
      chat, expert mentorship, and a supportive community wait for you.
    </p>
  </div>
);

const Dashboard = () => (
  <div className="text-center text-2xl">Dashboard (Protected)</div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
