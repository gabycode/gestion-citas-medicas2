// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3030/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});
