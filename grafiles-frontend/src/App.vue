<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  watch: {
    $route(to) {
      if (to.name === '/home') {
        document.body.classList.remove('login-bg');
        document.body.classList.add('home-bg');
      } else if (to.name === '/login') {
        document.body.classList.remove('home-bg');
        document.body.classList.add('login-bg');
      } else {
        document.body.classList.remove('home-bg', 'login-bg');
      }
    }
  }
}
</script>

<style>
.home-bg {
  background-color: #fafaff;
}

.login-bg {

  background-color: #30343f;
}

body {
  transition: background-color 0.5s ease;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #03B5AA;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #E56399;
}

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
</style>
