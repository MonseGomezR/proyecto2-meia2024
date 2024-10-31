<!-- App.vue -->
<template>
    <div>
      <button @click="openModal">Abrir Modal</button>
      <Modal :visible="isModalVisible" @close="closeModal">
        <h2>Este es el contenido del modal</h2>
        <p>Puedes agregar cualquier contenido aquí.</p>
      </Modal>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Modal from '../../../components/SideMenu.vue';
  
  const isModalVisible = ref(false)
  
  const openModal = () => {
    isModalVisible.value = true
  }
  
  const closeModal = () => {
    isModalVisible.value = false
  }
  </script>
  