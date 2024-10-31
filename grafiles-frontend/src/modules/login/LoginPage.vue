<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Bienvenido</h2>
      <form @submit.prevent="login">

        <div class="input-group">
          <input type="text" placeholder="Usuario" v-model="us" required>
        </div>
        <div class="input-group">
          <input type="password" placeholder="Password" v-model="password" required>
        </div>

        <button type="submit">Login</button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';
import { login as loginS } from './LoginService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const us = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    const { token, usuario } = await loginS(us.value, password.value);
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
    router.push('/home');

  } catch (err) {
    console.error(err.message);
    error.value = err.message;
    
    toast(error.value, {
        autoClose: 2000,
        closeButton: false,
        theme: 'light',
        type: 'error',
    });
  }
};

const loggedIn = async () => {
  const token = localStorage.getItem('token');
  document.body.style.backgroundColor = '#30343f'; // Fondo cuando se monta el componente

  if (token) {
    router.push('/home');
  }
};

const changeBg = async () => {
  document.body.style.backgroundColor = 'white'; // Fondo cuando se desmonta el componente
};

onMounted(loggedIn);
onBeforeUnmount(changeBg);
</script>

<style>
:root {
  --toastify-color-error: #E56399;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.login-box {
  background-color: #fafaff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);
}




</style>