<template>
    <div :class="getButtonClass(item.tipo)">
        <button @click="handleToggle">
            <img :src="getButtonImage(item.tipo)" alt="Botón Imagen" />
            <span>{{ item.name }}</span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        item: Object
    },
    methods: {
        async handleToggle() {
        },
        getButtonClass(tipo)  {
            return `file-item-${tipo}`;
        },
        getButtonImage(tipo) {
            return require(`../assets/file${tipo}.png`);
        }
    }

};
</script>

<style>
.file-item button {
    color: #EC9F05;
    border-color: #EC9F05;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 125px;
    transition: background-color 0.3s;
    background-color: #00000000;
    border: 3px solid;
    transition: background-color 0.5s ease;
}

.file-item-txt :hover {
    background-color: #E5639920;
}
.file-item-img :hover {
    background-color: #ed92b820;
}
.file-item-hmtl :hover {
    background-color: #c5216520;
}

.file-item-txt button :hover {
    background-color: #00000000;
}
.file-item-img button :hover {
    background-color: #00000000;
}
.file-item-hmtl button :hover {
    background-color: #00000000;
}

.file-item-txt button{
    color: #E56399;
    border-color: #E56399;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 125px;
    transition: background-color 0.3s;
    background-color: #00000000;
    border: 3px solid;
    transition: background-color 0.5s ease;
}
.file-item-img button{
    color: #ed92b8;
    border-color: #ed92b8;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 125px;
    transition: background-color 0.3s;
    background-color: #00000000;
    border: 3px solid;
    transition: background-color 0.5s ease;
}
.file-item-hmtl button{
    color: #c52165;
    border-color: #c52165;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 125px;
    transition: background-color 0.3s;
    background-color: #00000000;
    border: 3px solid;
    transition: background-color 0.5s ease;
}

.file-item-txt img {
    margin-bottom: 5px;
}
.file-item-img img {
    margin-bottom: 5px;
}
.file-item-html img {
    margin-bottom: 5px;
}
</style>