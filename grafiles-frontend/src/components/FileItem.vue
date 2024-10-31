<template>
    <div class="file-item">
        <button @click="handleToggle">
            <img src="../assets/folder.png">
            <span>{{ parent.name }}</span>
        </button>
    </div>
</template>

<script>
import { getFiles } from '../modules/inicio/sidebar/viewfiles/ViewFileService';
export default {
    props: {
        parent: Object,
        jsonData: Array,
    },
    methods: {
        async handleToggle() {
            console.log(this.parent.name);
            const filesData = await getFiles(this.parent._id); // Trae los archivos
            console.log(JSON.stringify(filesData));

            this.$emit("showCFiles", filesData); // Emite los archivos correctamente
            this.$emit("showChildren", this.parent._id, this.parent.name);
        },
    }
}
</script>

<style scoped>
.children {
    margin-left: 10px;
}

.file-item {
    display: block;
    width: 100px;
}

.file-item button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 125px;
    transition: background-color 0.3s;
    background-color: #00000000;
    color: #30343F;
    border-color: #30343F;
    border: 3px solid;
    transition: background-color 0.5s ease;
}

.file-item :hover {
    background-color: #00000020;
}

.file-item button :hover {
    background-color: #00000000;
}
.file-item img {
    margin-bottom: 5px;
}
</style>