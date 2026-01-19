import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';
import AskQuestion from './pages/questions/AskQuestion';
import QuestionList from './pages/questions/QuestionList';
import QuestionDetail from './pages/questions/QuestionDetail';

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
        {/* Public Routes (accessible only if guest) */}
        <Route element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Private Routes (accessible only if authenticated) */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions"
            element={
              <PrivateRoute>
                <QuestionList />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/ask"
            element={
              <PrivateRoute>
                <AskQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/:id"
            element={
              <PrivateRoute>
                <QuestionDetail />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
