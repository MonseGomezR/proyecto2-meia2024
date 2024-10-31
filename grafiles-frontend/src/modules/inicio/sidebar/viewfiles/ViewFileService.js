import axios from 'axios';

export const viewFiles = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/auth/directorios?owner_id=${userId}`);
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

export const getFiles = async (dirId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/auth/files?dir_id=${dirId}`);
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

export const newDir = async (owner_id, parent_id, name) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/newDir', {
            owner_id,
            parent_id,
            name,
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
}

export const newRoot = async(owner_id, name) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/newRoot', {
            owner_id,
            name
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

}