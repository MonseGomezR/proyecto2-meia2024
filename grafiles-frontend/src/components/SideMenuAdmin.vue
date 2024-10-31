<template>
  <transition name="slide">
    <div v-if="isOpen" class="side-menu">
      <button class="close-btn" @click="closeMenu">X</button>
      <div class="form-container">
        <h2>Agregar Nuevo Usuario</h2>
        <form @submit.prevent="crearUsuario">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input v-model="nombre" id="nombre" type="text" required @input="generarUsuario" />
          </div>

          <div class="form-group">
            <label for="apellido">Apellido:</label>
            <input v-model="apellido" id="apellido" type="text" required @input="generarUsuario" />
          </div>

          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input v-model="usuario" id="usuario" type="text" readonly />
          </div>

          <div class="form-group">
            <label for="contraseña">Contraseña:</label>
            <input v-model="contraseña" id="contraseña" type="password" required />
          </div>

          <div class="form-group">
            <label for="repetirContraseña">Repetir Contraseña:</label>
            <input v-model="repetirContraseña" id="repetirContraseña" type="password" required />
          </div>

          <div class="form-group">
            <label for="rol">Rol:</label>
            <select v-model="rol" id="rol" required>
              <option value="empleado">Empleado</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <button type="submit" :disabled="!formularioValido">Crear Usuario</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { newUser } from '../modules/inicio/sidebar/usuarios/UsuariosService';
import { newRoot } from '../modules/inicio/sidebar/viewfiles/ViewFilesService';
import { ref, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const nombre = ref('');
const apellido = ref('');
const usuario = ref('');
const contraseña = ref('');
const repetirContraseña = ref('');
const rol = ref('empleado');
const mensajeError = ref('');

const generarUsuario = () => {
  if (nombre.value && apellido.value) {
    usuario.value = `${nombre.value.toLowerCase()}.${apellido.value[0].toLowerCase()}${apellido.value[1].toUpperCase()}`;
  }
};

const formularioValido = computed(() => {
  return (
    nombre.value &&
    apellido.value &&
    contraseña.value &&
    repetirContraseña.value/*  &&
        contraseña.value === repetirContraseña.value */
  );
});

const crearUsuario = async () => {
  if (contraseña.value !== repetirContraseña.value) {
    mensajeError.value = 'Las contraseñas no coinciden';
    toast(mensajeError.value, {
      autoClose: 2000,
      closeButton: false,
      theme: 'light',
      type: 'error',
    });
    return;
  }
  try {
    mensajeError.value = '';
    const nombreF = nombre.value + ' ' + apellido.value;
    const result = await newUser(nombreF, contraseña.value, usuario.value, rol.value);
    console.log(result);
    toast("Usuario registrado correctamente.", {
      autoClose: 2000,
      closeButton: false,
      theme: 'light',
      type: 'success',
    });
    const user = result.data

    const result2 = await newRoot(user._id, 'Raiz');
    console.log(user);
    emit("closeM");

  } catch (error) {
    toast(error.message, {
      autoClose: 2000,
      closeButton: false,
      theme: 'light',
      type: 'error',
    });
  }
};

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['closeM']);

function closeMenu() {
  emit('closeM');
}

</script>

<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 10px;
  cursor: pointer;
  color: red;
  border: 2px solid red;
  border-radius: 55%;
  width: 20px;
  height: 20px;
  padding: 0;
  text-align: center;
}

.menu-section {
  margin-top: 20px;
}

.menu-section button {
  border: 3px solid #30343f;
  background-color: #00000000;
  color: #30343f;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.submenu-content {
  margin: 15px;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: 2px solid #d5d5d5;
  padding: 15px;
}

.submenu-content button {
  font-size: 10px;
  height: auto;
  width: auto;
}

.submenu-content input {
  font-size: 15px;
  margin: 15px;
}

.menu-section button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>
