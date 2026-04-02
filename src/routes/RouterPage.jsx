import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import AdminLayout from "../pages/AdminLayout";
import Dashboard from "../pages/Dashboard";
import RegisterPage from "../pages/RegisterPage";

const RouterPage = () => {
  return (
    <Routes>
   
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
   
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default RouterPage;