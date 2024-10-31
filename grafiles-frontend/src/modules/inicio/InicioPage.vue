<template>
  <div class="container">
    <aside class="sidebar">
      <SideBar />
    </aside>
    <main class="contenido">
      <router-view />
    </main>
  </div>

</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, provide } from 'vue';
import SideBar from './SideBar.vue';
/* import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; */

const currentView = ref('');

const updateView = (viewName) => {
  currentView.value = viewName;
};



provide('currentView', currentView);
provide('updateView', updateView);

const entered = async () => {
  document.body.style.backgroundColor = '#fafaff';
};

const exited = async () => {
  document.body.style.backgroundColor = 'white';
};

onMounted(entered);
onBeforeUnmount(exited);

</script>


<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 100px;
  padding: 20px;
  background-color: #30343f;
  color: white;
  overflow-y: auto;
  position: sticky;
    bottom: 0;
}

.contenido {
  flex: 1;
  padding: 20px;
}

:root {
  --toastify-color-success: #03B5AA;
}
</style>