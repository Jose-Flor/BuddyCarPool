
import axios from 'axios';

export const signIn = async (email, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/login', {
      email: email,
      password: password
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

