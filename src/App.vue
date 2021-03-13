<template>
  <div id="app">
    <!-- <upload v-show="false"/> -->
    <LogIn v-show="this.$store.state.showLogIn" @fetchSongsGrant="fetchSongsGrant" />
    <regUser v-show="this.$store.state.showRegUser" />
    <player v-show="this.$store.state.showPlayer" v-bind:loggedIn="loggedIn" />
  </div>
</template>

<script>
import LogIn from "./components/LogIn.vue"
import regUser from "./components/SignUp.vue"
import player from "./components/Player.vue"
import upload from "./components/UploadSong.vue"

export default {
  name: 'app',
  components: {
    LogIn, 
    regUser, 
    player, 
    upload
  },
  data () {
    return {
      showLogInComp: true,
      showRegUserComp: false,
      showPlayerComp: false,
      loggedIn: false,
      username: ""
    }
  },
  methods: {
    fetchSongsGrant () {
      this.loggedIn = true
    },
  },
  mounted () {
    // Loads custom background image if it exists
    if (localStorage.getItem("custom_background_image"))
    {
      document.getElementById("app").style.backgroundImage = "url(" + localStorage.getItem('custom_background_image') + ")"
    }

    // Shows confirmation alert of successful sign out 
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("signedout"))
    {
      window.history.pushState("", "", "/")
      setTimeout(function () {
        Ozone.fire("success","You have been signed out","top-right")
      }, 1500)
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
  background: url(/src/assets/wolfgang-hasselmann-opti.jpg) no-repeat center center fixed; 
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
