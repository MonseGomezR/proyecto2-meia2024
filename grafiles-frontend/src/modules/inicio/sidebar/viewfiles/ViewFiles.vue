<template>
  <div class="sup-container">
    <h2>Mis Archivos</h2>
    <div class="route-container">
      <p>Inicio/{{ currentPath }}</p>
    </div>
    <div class="button-container">
      <button :disabled="!canGoBack" @click="goBack">
        <img src="../../../../assets/back.png">
        Regresar
      </button>
      <button :disabled="!canGoBack" @click="toggleMenu">
        <img src="../../../../assets/add.png">
        Nuevo
      </button>
      <SideMenu :isOpen="isMenuOpen" :option1Enabled="noRoot"
      :option2Enabled="noRoot"  @close="toggleMenu" @refresh="refreshFiles" :parent="getParent"/>
    </div>
  </div>
  <div class="file-container">
    <div class="file-grid">
      <FileItem v-for="item in currentLevelItems" :key="item._id" :parent="item" :jsonData="jsonData"
        :currentPath="item.name" @showChildren="showChildren" @showCFiles="showCFiles" />

      <ArchivoItem v-for="item in filesData" :key="item._id" :item="item" />
      <div v-if="isEmpty">
        <p>Carpeta vacia.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FileItem from '../../../../components/FileItem.vue';
import ArchivoItem from '../../../../components/ArchivoItem.vue';
import SideMenu from '../../../../components/SideMenu.vue';
import { viewFiles } from './ViewFileService';
import { getFiles } from './ViewFileService';


const jsonData = ref([]);
const filesData = ref([]);
const currentParentId = ref(null);
const currentParentName = ref(null);
const currentPathStack = ref([]);
const currentLevelItems = ref([]);
const isMenuOpen = ref(false);

const getParent = computed(() => currentParentId.value );
const currentPath = computed(() => currentPathStack.value.join('/'));
const isEmpty = computed(() => currentLevelItems.value.length === 0 && filesData.value.length === 0);
const canGoBack = computed(() => currentParentId.value !== null);
const noRoot = computed(() => currentParentName.value === 'Root' || currentParentName.value === 'root' || currentParentName.value === 'Raiz' || currentParentName.value === 'raiz')
const parents = computed(() => jsonData.value.filter(item => item.parent_id === null));

const showChildren = (parentId, parentName) => {
  currentParentId.value = parentId;
  currentParentName.value = parentName;
  currentLevelItems.value = jsonData.value.filter(item => item.parent_id === parentId);
  currentPathStack.value.push(parentName);
  if(isMenuOpen.value) {
    toggleMenu();
  }
};

const showCFiles = (files) => {
  filesData.value = files;
};


const goBack = async () => {
  if (currentParentId.value === null) return;

  const parent = jsonData.value.find(item => item._id === currentParentId.value);
  currentParentId.value = parent ? parent.parent_id : null;

  currentLevelItems.value = currentParentId.value === null
    ? parents.value
    : jsonData.value.filter(item => item.parent_id === currentParentId.value);

  filesData.value = await getFiles(currentParentId.value);
  currentPathStack.value.pop();
  if(isMenuOpen.value) {
    toggleMenu();
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const refreshFiles = async () => {
  toggleMenu();
  filesData.value = await getFiles(currentParentId.value);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  jsonData.value = await viewFiles(userId);
}

onMounted(async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    console.log(userId);

    jsonData.value = await viewFiles(userId);
    currentLevelItems.value = parents.value;
  } catch (error) {
    console.error("Error al cargar archivos:", error.message);
  }
});
</script>

<style scoped>
.file-container {
  margin: 15px 0px;
  padding: 20px;
  border: 3px solid #d8d8d8;
  border-radius: 10px;
}

.file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
  grid-column-gap: 5px;
  grid-row-gap: 5px;
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

.route-container {
  display: flex;
  flex-direction: row;
  padding: 5px;
  border: 2px solid #d4d4d4;
  background-color: #f1f1f1;
}

.button-container button {
  width: auto;
  margin-right: 10px;

  margin-top: 10px;
}

.button-container button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

.children {
  margin-left: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

strong {
  font-size: 1.2em;
}
</style>
