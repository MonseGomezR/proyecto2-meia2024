<template>
    <div class="container-sb">
        <div class="profile">
            <div class="avatar"></div>
            <h3>{{ usuario }}</h3>
        </div>
        <nav>
            <ul>
                <li><a href="#" @click="changeRoute('files')">
                    <img src="../../assets/files.png">
                    <p>Archivos</p>
                </a></li>
                <li><a href="#" @click="changeRoute('options')">
                    <img src="../../assets/options.png">
                    <p>Opciones</p>
                </a></li>
                <li v-if="rol === 'administrador'"><a href="#" @click="changeRoute('admin')">
                    <img src="../../assets/admin.png">
                    <p>Panel de Admin.</p>
                </a></li>
                <li><a href="#" @click="handleSignOut">
                    <img src="../../assets/logout.png">
                    <p>Cerrar Sesion</p>
                </a></li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const usuario = ref('');
const rol = ref('');
const router = useRouter();

const changeRoute = (view) => {
  router.push(`/home/${view}`);
};


const handleSignOut = async () => {
    console.log("Cerrando Sesión");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
}

const entered = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    usuario.value = user.name;
    rol.value = user.rol;
    console.log(localStorage.getItem('user'));
}
onMounted(entered);
</script>

<style>
.container-sb {
    width: 100%;
}

.profile {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.avatar {
    background-color: #E56399;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
}

nav ul {
    
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

nav ul li {
    margin: 0 0;
    width: auto;
    
    justify-content: center;
    align-items: center;
}

nav ul li a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
    background-color: #30343f;
    color: white;
    text-align: center;
    font-size: 10px;
    font-weight: 500;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

nav ul li a:hover {
    background-color: #2c3e50;
}


</style>