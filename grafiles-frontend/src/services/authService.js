import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('token');
};

export const getProtectedData = async () => {
  const token = getToken();

  try {
    const response = await axios.get('http://localhost:3000/api/auth/home', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Error al acceder a la ruta protegida: ' + error.response.data.message);
  }
};
