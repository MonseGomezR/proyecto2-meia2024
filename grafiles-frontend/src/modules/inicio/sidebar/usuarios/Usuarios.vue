<template>
    <div class="usuarios-list">
        <h2>Usuarios</h2>
        <button  @click="toggleMenu" class="add-button">
            <img src="../../../../assets/add.png" alt="">
            Agregar Usuario
        </button>
        <div class="table-container">
            <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in userlist" :key="item._id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.usuario }}</td>
                    <td>{{ item.rol }}</td>
                    <td><button>Editar Usuario</button></td> <!-- Puedes personalizar la acción -->
                </tr>
            </tbody>
        </table>
        </div>
        <SideMenuAdmin  :isOpen="isMenuOpen" @closeM="toggleMenu"/>
    </div>

    
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { viewUsers } from './UsuariosService';
import SideMenuAdmin from '../../../../components/SideMenuAdmin.vue';

const userlist = ref([]);
const isMenuOpen = ref(false);

const getUsuarios = async () => {
    const response = await viewUsers();
    userlist.value = response.users;
}
const toggleMenu = async () => {
  isMenuOpen.value = !isMenuOpen.value;
  
  const response = await viewUsers();
    userlist.value = response.users;
};

onMounted(getUsuarios);
</script>

<style>
.usuarios-list {
    justify-content: center;
}

.table-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px; /* Espacio alrededor de la tabla */
    border: 1px solid #ddd;
    max-height: 450px; /* Altura máxima del contenedor de la tabla */
    overflow-y: auto; /* Habilita el scroll solo cuando excede el tamaño */
    margin-bottom: 10px; /* Opcional: bordes alrededor del contenedor */
}

table {
    border-collapse: collapse; /* Colapsa bordes de la tabla */
    width: 80%; /* Ajusta el ancho de la tabla */
}

th, td {
    border: 1px solid #ddd; /* Bordes de las celdas */
    padding: 6px; /* Espacio interno en las celdas */
    text-align: center; /* Centra el texto */
}

th {
    background-color: #f2f2f2; /* Color de fondo para el encabezado */
    position: sticky; /* Hace que los encabezados sean fijos */
    top: 0;
    
}

.add-button {
    width: auto;
    height: 50px;
    vertical-align: middle;
}
</style>
