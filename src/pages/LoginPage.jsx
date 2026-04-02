import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, FileText } from 'lucide-react';
import { loginUser } from '../services/apiService';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(formData);
      localStorage.setItem('user', JSON.stringify(res.user));
      toast.success("Welcome Back!");
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      
      <div className="card shadow-lg border-0 p-4" style={{ width: "380px", borderRadius: "16px" }}>
        
       
        <div className="text-center mb-4">
          <div className="bg-primary text-white d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: 60, height: 60 }}>
            <FileText size={28} />
          </div>
          <h4 className="fw-bold">Welcome Back</h4>
          <p className="text-muted small">Sign in to manage your CSV uploads</p>
        </div>

  
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label small fw-semibold">Email</label>
            <input
              type="email"
              className="form-control bg-light border-0 p-2"
              placeholder="Enter your email"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold">Password</label>
            <input
              type="password"
              className="form-control bg-light border-0 p-2"
              placeholder="Enter your password"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button 
            className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>

  
        <div className="text-center mt-4">
          <p className="small text-muted mb-0">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold text-decoration-none">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;