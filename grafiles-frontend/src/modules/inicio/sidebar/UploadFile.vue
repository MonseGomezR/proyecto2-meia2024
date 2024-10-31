<template>
    <div>
        <h2>Subir Archivo</h2>
        <input type="file" @change="onFileChange" />
        <button @click="uploadFile">Subir</button>
        <p v-if="filePath">Archivo subido: <a :href="filePath" target="_blank">{{ filePath }}</a></p>
    </div>
</template>

<script>
/* import axios from 'axios'; */

export default {
    data() {
        return {
            file: null,
            filePath: '',
        };
    },
    methods: {
        onFileChange(event) {
            this.file = event.target.files[0];
        },
        async uploadFile() {
            const formData = new FormData();
            formData.append('file', this.file);
            console.log(formData);
            /* try {
                const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.filePath = response.data.filePath;
            } catch (error) {
                console.error('Error al subir el archivo:', error);
            } */
        },
    },
};
</script>

<style>
</style>
