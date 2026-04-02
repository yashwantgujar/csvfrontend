import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, FileText } from 'lucide-react';
import { registerUser } from '../services/apiService';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("Account created! Please login.");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">

      <div className="card shadow-lg border-0 p-4" style={{ width: "380px", borderRadius: "16px" }}>
        
        
        <div className="text-center mb-4">
          <div className="bg-primary  text-white d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: 60, height: 60 }}>
            <FileText size={28} />
          </div>
          <h4 className="fw-bold">Create Account</h4>
          <p className="text-muted small">Get started with CSV processing</p>
        </div>

       
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label small fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control bg-light border-0 p-2"
              placeholder="Enter your name"
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

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
              placeholder="Create password"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button 
            className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : <><UserPlus size={18} /> Create Account</>}
          </button>
        </form>

       
        <div className="text-center mt-4">
          <p className="small text-muted mb-0">
            Already have an account?{" "}
            <Link to="/" className="text-primary fw-semibold text-decoration-none">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;