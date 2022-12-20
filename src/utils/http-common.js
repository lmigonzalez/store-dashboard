import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3032/api',
  headers: {
    'Content-type': 'application/json',
  },
});


export default http;