import axios from 'axios';

export const login = async (usuario, password) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      usuario,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data);
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error('Error en la configuración de la solicitud');
    }
  }
};