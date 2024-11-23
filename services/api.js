import axios from 'axios';

// Criação da instância do Axios
const api = axios.create({
  baseURL: 'http://192.168.1.10:9099', // Substitua pela URL do seu backend
});
export { api };  // Certifique-se de exportar a instância do axios