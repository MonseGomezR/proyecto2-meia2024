<template>
  <transition name="slide">
    <div v-if="isOpen" class="side-menu">
      <button class="close-btn" @click="closeMenu">X</button>

      <div class="menu-section">
        <button class="special" :disabled="!option1Enabled || isOption2Active" @click="toggleOption1Content">
          Archivo
        </button>
        <div v-if="showOption1Content" class="submenu-content">
          <input id="elinput" type="file" @change="onFileChange" accept=".txt, image/png, image/jpeg" />
          <button @click="uploadFile">Subir</button>
        </div>
      </div>

      <div class="menu-section">
        <button class="special" :disabled="!option2Enabled || isOption1Active" @click="toggleOption2Content">
          Carpeta
        </button>
        <div v-if="showOption2Content" class="submenu-content">
          <input v-model="nombreDir" type="text" required />
          <button @click="createDir">Crear Carpeta</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';
import { defineEmits } from 'vue';
import { newDir } from '../modules/inicio/sidebar/viewfiles/ViewFileService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Definición de propiedades
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  option1Enabled: {
    type: Boolean,
    default: false,
  },
  option2Enabled: {
    type: Boolean,
    default: false,
  },
  parent: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close', 'refresh']);

// Variables reactivas
const showOption1Content = ref(false);
const showOption2Content = ref(false);
const isOption1Active = ref(false);
const isOption2Active = ref(false);
const selectedFile = ref(null);
const nombreDir = ref('');

// Métodos
const closeMenu = () => {
  emit('close');
};

const toggleOption1Content = () => {
  showOption1Content.value = !showOption1Content.value;
  isOption1Active.value = showOption1Content.value;

  if (showOption1Content.value) {
    isOption2Active.value = false;
  }
};

const toggleOption2Content = () => {
  showOption2Content.value = !showOption2Content.value;
  isOption2Active.value = showOption2Content.value;

  if (showOption2Content.value) {
    isOption1Active.value = false;
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

const uploadFile = async () => {
  if (selectedFile.value && props.parent) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('dir_id', props.parent);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      toast("Archivo agregado correctamente.", {
        autoClose: 1500,
        closeButton: false,
        theme: 'light',
        type: 'success',
      });
      document.getElementById('elinput').value = null;
      selectedFile.value = null;
      emit('refresh');

    } catch (error) {
      let errorMessage = 'Error de conexión al servidor.';
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      toast(errorMessage, {
        autoClose: 2000,
        closeButton: false,
        theme: 'light',
        type: 'error',
      });
    }
  } else {
    alert('Por favor, selecciona un archivo');
  }
};

const createDir = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await newDir(user._id, props.parent, nombreDir.value);
  console.log(response);
  toast("Carpeta agregada correctamente.", {
        autoClose: 1500,
        closeButton: false,
        theme: 'light',
        type: 'success',
      });
      nombreDir.value = null;
      emit('refresh');
};
</script>


<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 700px;
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

.special {
  width: 400px;
}

.menu-section button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
