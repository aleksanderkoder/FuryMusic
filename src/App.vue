<template>
  <div id="app">
    <LogIn v-show="showLogInComp" @GoToSignUp="goToSignUp"/>
    <regUser v-show="showRegUserComp" @GoToSignIn="goToSignIn"/>
  </div>
</template>

<script>
import LogIn from "./components/LogIn.vue"
import regUser from "./components/regUser.vue"

export default {
  name: 'app',
  components: {
    LogIn, 
    regUser
  },
  data () {
    return {
      showLogInComp: true,
      showRegUserComp: false
    }
  },
  methods: {
    goToSignUp() {
      this.showRegUserComp = true
      this.showLogInComp = false
      console.log("Showing sign up form...")
    },
    goToSignIn() {
      this.showRegUserComp = false
      this.showLogInComp = true
      console.log("Showing sign in form...")
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
  height: 100%; 
  margin: auto;
  background: url(/src/assets/bak.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background: url(/src/assets/bak.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; */
  background-color: black;
  font-family: "Wals";
  overflow: hidden;
}

input:focus {
  outline: none;
}

h1, h2 {
  font-weight: normal;
  font-family: "Wals";

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
