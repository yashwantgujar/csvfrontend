export const API_BASE_URL = "http://localhost:5000/api/v1"; // backend URL

export const API_ENDPOINT = {
  // Auth APIs
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,

  // CSV APIs
  CSV_UPLOAD: `${API_BASE_URL}/csv/upload`,
  CSV_STATUS: (id) => `${API_BASE_URL}/csv/status/${id}`,
  CSV_CANCEL: (id) => `${API_BASE_URL}/csv/cancel/${id}`,
  CSV_TEMPLATE: `${API_BASE_URL}/csv/template`,
  CSV_MY_JOBS: `${API_BASE_URL}/csv/my-jobs`
};