import axios from 'axios';
import { API_ENDPOINT } from '../authApi/api'; 
import API from '../api/axios'; 

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(API_ENDPOINT.REGISTER, formData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Error in registerUser:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(API_ENDPOINT.LOGIN, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    console.error("Error in loginUser:", error.response?.data || error.message);
    throw error;
  }
};



export const uploadCSVFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await API.post(API_ENDPOINT.CSV_UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const fetchJobStatus = async (jobId) => {
  const response = await API.get(API_ENDPOINT.CSV_STATUS(jobId));
  return response.data;
};

export const cancelJobApi = async (jobId) => {
  const response = await API.delete(API_ENDPOINT.CSV_CANCEL(jobId));
  return response.data;
};

export const downloadTemplateApi = () => {
  window.open(API_ENDPOINT.CSV_TEMPLATE, '_blank');
};


export const getMyJobsApi = async () => {
  const res = await API.get(API_ENDPOINT.CSV_MY_JOBS);
  return res.data;
};