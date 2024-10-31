<template>
    <div class="sub-container">
        <nav>
            <ul class="adminV">
                <li><a href="#" @click="changeRoute('users')">Usuarios</a></li>
                <li><a href="#" @click="changeRoute('trash')">Opciones</a></li>
            </ul>
        </nav>
    </div>
</template>



<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const changeRoute = (view) => {
  router.push(`/home/admin/${view}`);
};
</script>

<style scoped>

.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.contenedor {
    display: flex;
    justify-content: center;
}

.adminV {
    display: flex; /* Esto coloca los elementos en una sola línea */
    list-style-type: none; /* Elimina los puntos de lista */
    padding: 0;
    margin: 0;
}

.adminV li {
    margin-right: 5px; /* Espaciado entre elementos */
}

.adminV a {
    text-decoration: none; /* Elimina el subrayado en los enlaces */
    color: #333;
    font-weight: bold;
    text-align: center;
    padding: 14px 16px;
    background-color: #ccc;
    text-decoration: none;
}

.adminV a:hover {
    background-color: #03B5AA; /* Cambia el fondo al pasar el cursor */
    color: #000;
    border-radius: 4px;
}

.adminV a.active {
  background-color: #032e1e;
  color: white;
}
</style>