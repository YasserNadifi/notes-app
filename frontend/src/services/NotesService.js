import axios from 'axios';

const API_URL = 'http://localhost:8080/notes';

export const getNotes = async () => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};