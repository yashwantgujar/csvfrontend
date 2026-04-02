import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { API_ENDPOINT } from '../authApi/api';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post(API_ENDPOINT.LOGOUT);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand mb-0 h1">CSV Processor Admin</span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;