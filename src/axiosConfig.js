import axios from 'axios';
const axiosInstance = axios.create({
  baseURL:'https://agrariantradesystemapi.azurewebsites.net/api',
  // baseURL:'https://localhost:7144/api',
});

export default axiosInstance;