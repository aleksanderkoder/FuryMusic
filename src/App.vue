<template>
  
    <LogIn />
  
</template>

<script>
import LogIn from "./components/LogIn.vue"

export default {
  name: 'app',
  components: {
    LogIn
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: auto;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url(/src/assets/bak.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-color: black;
  font-family: 'Monsterrat', sans-serif;
}

input:focus {
  outline: none;
}

h1, h2 {
  font-weight: normal;
  font-family: 'Monsterrat', sans-serif;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
