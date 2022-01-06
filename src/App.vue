<template>
  <div id="app">
    <SignIn
      v-show="this.$store.state.showLogIn"
      @fetchSongsGrant="fetchSongsGrant"
    />
    <!-- <SignUp v-show="this.$store.state.showRegUser" /> -->
    <Player v-show="this.$store.state.showPlayer" v-bind:loggedIn="loggedIn" />
  </div>
</template>

<script>
import SignIn from "./components/SignIn.vue";
import Player from "./components/Player.vue";

export default {
  name: "app",
  components: {
    SignIn,
    Player,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    fetchSongsGrant() {
      this.loggedIn = true;
    },
  },
  mounted() {
    // Loads custom background image if it exists
    if (localStorage.getItem("custom_background_image")) {
      document.getElementById("app").style.backgroundImage =
        "url(" + localStorage.getItem("custom_background_image") + ")";
    }

    // Shows confirmation alert of successful sign out
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("signedout")) {
      window.history.pushState("", "", "/");
      setTimeout(function () {
        Ozone.fire("success", "You have been signed out", "top-right");
      }, 1500);
    }
  },
};
</script>

<style>

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: url("./assets/def-back.jpg") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

body {
  background-color: black;
  font-family: "Wals";
  overflow: hidden; 
  -webkit-user-select: none;        
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none; 
}

input:focus {
  outline: none;
}

h1,
h2 {
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

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: white; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(184, 183, 183); 
}

@font-face {
  font-family: "Yellowtail";
  src: url(/src/assets/fonts/Yellowtail-Regular.ttf);
}

@font-face {
  font-family: "Monsterrat";
  src: url(/src/assets/fonts/Montserrat-Medium.ttf);
}

@font-face {
  font-family: "Wals";
  src: url(/src/assets/fonts/GTWalsheimPro-Regular.ttf);
}

/* To remove 000webhost label */
img[src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"] {
  display: none; 
}

</style>
