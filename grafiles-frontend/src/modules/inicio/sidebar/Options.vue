<template>
    <div class="user-settings">
        <h2>Cambiar Contraseña</h2>
        <form @submit.prevent="changePassword">
            <div class="form-group">
                <label for="oldPassword">Contraseña Antigua:</label>
                <input type="password" id="oldPassword" v-model="oldPassword" required />
            </div>
            <div class="form-group">
                <label for="newPassword">Nueva Contraseña:</label>
                <input type="password" id="newPassword" v-model="newPassword" required />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirmar Nueva Contraseña:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            </div>
            <button type="submit">Cambiar Contraseña</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'UserSettings',
    setup() {
        const oldPassword = ref('');
        const newPassword = ref('');
        const confirmPassword = ref('');
        const message = ref('');

        const changePassword = () => {
            if (newPassword.value !== confirmPassword.value) {
                message.value = 'La nueva contraseña y la confirmación no coinciden.';
                toast(message.value, {
                    autoClose: 2000,
                    closeButton: false,
                    theme: 'light',
                    type: 'error',
                });
                return;
            }

            // Aquí podrías agregar la lógica para verificar la contraseña antigua y actualizar la nueva
            console.log('Contraseña antigua:', oldPassword.value);
            console.log('Nueva contraseña:', newPassword.value);
            message.value = 'Contraseña cambiada con éxito.';

            // Ejemplo de llamada a un backend:
            // axios.post('/api/user/change-password', { oldPassword: oldPassword.value, newPassword: newPassword.value })
            //   .then(response => { /* manejar respuesta */ })
            //   .catch(error => { /* manejar error */ });
        };

        return {
            oldPassword,
            newPassword,
            confirmPassword,
            message,
            changePassword
        };
    }
};
</script>

<style scoped>
.user-settings {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.message {
    margin-top: 10px;
    color: green;
}
</style>