import axios from 'axios';

let AxiosConfig = axios.create({
  baseURL: 'http://localhost:8351/api',
});

export default AxiosConfig;