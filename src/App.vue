<template>
  <div id="app">
    <LogIn v-show="showLogInComp" @GoToPlayer="goToPlayer" @GoToSignUp="goToSignUp"/>
    <regUser v-show="showRegUserComp" @GoToSignIn="goToSignIn"/>
    <player v-show="showPlayerComp" v-bind:loggedIn="loggedIn" />
  </div>
</template>

<script>
import LogIn from "./components/LogIn.vue"
import regUser from "./components/regUser.vue"
import player from "./components/player.vue"

export default {
  name: 'app',
  components: {
    LogIn, 
    regUser, 
    player
  },
  data () {
    return {
      showLogInComp: true,
      showRegUserComp: false,
      showPlayerComp: false,
      loggedIn: false
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
    },
    goToPlayer() {
      this.showPlayerComp = true
      this.showLogInComp = false
      this.loggedIn = true
      console.log("Showing player...")
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
