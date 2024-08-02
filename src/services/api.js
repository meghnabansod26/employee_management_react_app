import axios from "axios";

const API_URL = "http://localhost:5000";

const api = {
  getEmployees: () => axios.get(`${API_URL}/employees`),
  getEmployeeById: (id) => axios.get(`${API_URL}/employees/${id}`),
  createEmployee: (employee) => axios.post(`${API_URL}/employees`, employee),
  updateEmployee: (id, employee) =>
    axios.put(`${API_URL}/employees/${id}`, employee),
  deleteEmployee: (id) => axios.delete(`${API_URL}/employees/${id}`),
  getCountries: () => axios.get(`${API_URL}/countries`),
};

export default api;
