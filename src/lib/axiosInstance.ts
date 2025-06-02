import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.chess.com', 
});

export default axiosInstance