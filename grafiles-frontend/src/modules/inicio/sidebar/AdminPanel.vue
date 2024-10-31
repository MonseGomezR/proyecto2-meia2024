<template>
    <div class="sup-container">
        <div class="button-container">
            <button  @click="changeRoute('users')">
                <img src="../../../assets/users.png" alt="">
                Usuarios
            </button>
            <button :disabled=true @click="changeRoute('trash')">
                <img src="../../../assets/trash.png" alt="">
                Papelera
            </button>
        </div>
    </div>
    <div class="contenido-admin">
        <router-view/>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const changeRoute = (view) => {
  router.push(`/home/admin/${view}`);
};
</script>

<style>
.contenedor {
    display: flex;
    height: 100vh;
    overflow: hidden;
}

.sup-container {
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-container {
  display: flex;
}
</style>
