import axios from 'axios';

export const viewUsers = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/auth/getUsers`);
        console.log(JSON.stringify(response.data))
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

export const newUser = async(name, password, usuario, rol) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/auth/register`, {
            name,
            password,
            usuario,
            rol
          });
        console.log(JSON.stringify(response.data))
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
}