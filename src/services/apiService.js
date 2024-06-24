import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BASE_URL = 'https://agrariantradesystemapi.azurewebsites.net/';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    //const navigate = useNavigate();
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("hdfsdfsfsdfsdfsdfsdfsdfsdfsdfsdfs");
      //navigate('/login');
    }
  }
)

const AuthService = {
  userRegister: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/Auth/UserRegister`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  farmerRegister: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/Auth/FarmerRegister`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  courierRegister: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/Auth/CourierRegister`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  sendEmail: async (emailData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Email`, emailData);
      return response.data, response.status;
    } catch (error) {
      throw error.response.data;
    }
  },
  login: async (data) => {
    try{
      const response = await axios.post(`${BASE_URL}/Auth/login`, data);
      return response.data;
    }
    catch (error){
      throw error.response.data;
    }
  },
  forgetPwd: async(email) => {
    try{
      const response = await axios.post(`${BASE_URL}/Auth/forgot-password`, email);
      return response.data;
    }
    catch(error){
      throw error.response.data;
    }
  },
  resetPwd: async(data) => {
    try{
      const response = await axios.post(`${BASE_URL}/Auth/reset-password`, data);
      return response.data;
    }
    catch(error){
      throw error.response.data;
    }
  },
  verifyEmail: async(data) => {
    try{
      const response = await axios.post(`${BASE_URL}/Auth/verify`, data);
      return response.data;
    }
    catch(error){
      throw error.response.data;
    }
  },
  verifyLink: async(data) => {
    try{
      const response = await axios.post(`${BASE_URL}/Auth/getVerifyLink`, data)
      return response.data;
    }
    catch(error){
      throw error.response.data;
    }
  },
  getDetailsAccount: async(email) => {
    try{
      const response = await api.get(`${BASE_URL}/Auth/getUserDetails?email=${email}`);
      return response.data;
    }
    catch(error){
      throw error.response.data;
    }
  },
  changeDetails: async(data) => {
    try{
      const response = await axios.post(`${BASE_URL}/Auth/changeUserDetails`, data);
      return response.data;
    }
    catch(error){
      throw error.response.data;
    }
  },
  changeProfileImg: async (Data) => {
    try {
      const response = await axios.post(`${BASE_URL}/Auth/changeProfileImg`, Data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  changePwd: async(data) => {
    try{
      const response = await axios.post(`${BASE_URL}/Auth/changePassword`, data);
      return response.data;
    }
    catch(error){
      throw error.response.data;
    }
  }
};

export default AuthService;
