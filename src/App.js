import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import './styles.scss';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContext } from './AuthContext';

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
      if (!currentUser) {
        return <Navigate to="/login" />;
      }
      return children;
    }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
