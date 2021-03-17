<template>
  <div>
    <div class="animate__animated animate__fadeInDownBig" id="divLogInWrapper">
      <img width="250" class="animate__animated animate__pulse animate__slow animate__infinite" src="/src/assets/fury music logo ferdig.png">
      <br>
      <h2 id="logInTittel">Sign in</h2>
      <form onSubmit="return false">
        <font-awesome-icon style="color: black" :icon="['fas', 'user']" />
        <input type="text" v-model="username" placeholder="Username" id="username">
        <br>
        <font-awesome-icon style="color: black" :icon="['fas', 'lock']" />
        <input type="password" v-model="password" placeholder="Password" id="password">
        <br>
        <p id="error" class="animate__animated animate__shakeX"></p>
        <input type="submit" v-on:click="logIn()" value="Sign in" id="btnLogIn">
      </form>
      <button id="btnGoToSignUp" v-on:click="goToSignUp()">Sign up</button>
      <br>
      <!-- <input id="checkRememberMe" type="checkbox" v-model="rememberMe">  LIKER JEG DETTE???? HMMMMMMM
      <label for="checkRememberMe" style="font-size: 13px">Stay signed in</label> -->
      <br>
      <font-awesome-icon id="loadingSpinner" :icon="['fas', 'spinner']" spin />
      <a href="">Forgot password?</a>
    </div>
    <p id="makersMark" class="animate__animated animate__fadeInUpBig">© Aleksander Johansen</p>
  </div>
</template>

<script>

export default {
  name: 'SignIn',
  data () {
    return {
      username: "",
      password: "",
      rememberMe: false, 
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    }
  },
  methods: {
    logIn() {
      let self = this
      document.getElementById("loadingSpinner").style.display = "block"
      document.getElementById("btnLogIn").style.display = "none"
      document.getElementById("btnGoToSignUp").style.display = "none"
      document.getElementById("error").style.display = "none"

      if (this.regExLogIn()) 
      {
        $.ajax(
        {
          type:"POST",
          url: this.apiURL + "userLogIn.php",
          dataType: "json",
          data:{username: this.username, password: this.password},
          cache:false,
          async: true,
          success: function (data) {
              console.log(data) 
              document.getElementById("loadingSpinner").style.display = "none"
              document.getElementById("btnLogIn").style.display = "block"
              document.getElementById("btnGoToSignUp").style.display = "block"

              if(data != "Wrong info")
              {
                console.log("Logging in user...")

                localStorage.setItem("username", self.username)
                localStorage.setItem("password", self.password)

                document.getElementById("username").value = ""
                document.getElementById("password").value = ""
                document.getElementById("error").style.display = "none"
                self.$store.commit("showPlayer")
                self.$store.commit("updateUsername", self.username)
                self.$emit("fetchSongsGrant")

                setTimeout( function () {
                  Ozone.fire("success","Signed in as " + self.$store.state.username, "bottom-middle")
                }, 2000)
              }
              else
              {
                document.getElementById("error").style.display = "block"
                document.getElementById("error").innerHTML = "Wrong username or password!"
                console.log("feil")
                
              }
              self.username = ""
              self.password = ""
            },
            error:function(er){
              console.log(er)
              document.getElementById("loadingSpinner").style.display = "none"
              document.getElementById("btnLogIn").style.display = "block"
              document.getElementById("btnGoToSignUp").style.display = "block"
              Ozone.fire("error","Server offline","top-right")
            }
          })
      }
      else
      {
        document.getElementById("error").style.display = "block"
        document.getElementById("loadingSpinner").style.display = "none"
        document.getElementById("error").innerHTML = "Please provide a valid username and password!"
        document.getElementById("btnLogIn").style.display = "block"
        document.getElementById("btnGoToSignUp").style.display = "block"
      }
      
    },
    regExLogIn() {
      let regEx1 = /^[0-9a-zæøåA-ZÆØÅ]{3,99}$/ 
      let regEx2 = /^[0-9a-zæøåA-ZÆØÅ!?,.-]{6,99}$/
      
      let ok1 = regEx1.test(this.username)
      let ok2 = regEx2.test(this.password)

      if (!ok1 || !ok2) 
      {
        return false
      }
      else 
      {
        return true
      }

    },
    goToSignUp() {
      document.getElementById("error").style.display = "none"
      this.$store.commit("showSignUp")
    }
  },
  mounted () {
      // Checks if user information has been already entered, and logs user in if true otherwise
      if (localStorage.getItem("username") && localStorage.getItem("password"))
      {
        this.username = localStorage.getItem("username")
        this.password = localStorage.getItem("password")
        this.logIn() 
      }
    }
  }
  
</script>

<style scoped>

@font-face {
  font-family: "Monsterrat";
  src: url(/src/assets/fonts/Montserrat-Medium.ttf);
}

@font-face {
  font-family: "Wals";
  src: url(/src/assets/fonts/GTWalsheimPro-Regular.ttf);
}

@font-face {
  font-family: "Yellowtail";
  src: url(/src/assets/fonts/Yellowtail-Regular.ttf);
}

#divLogInWrapper {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 1); 
  width: 400px;
  min-height: 670px;
  margin: auto;
  margin-top: 6.5%;
  border-radius: 1%; 
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Monsterrat";
  
}

#loadingSpinner {
  color: black; 
  font-size: 40px;
  display: none;
  margin: auto;  
}

#username, #password {
  border: none;
  margin: 15px;
  margin-right: 33px;
  width: 155px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 4px; 
  height: 30px;
  font-family: "Wals";
  border-radius: 3px;
}

#error {
  color: red;
  display: none;
  font-family: "Monsterrat";
}

#btnLogIn {
  margin: auto;
  margin-top: 20px;
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  width: 140px;
  border-radius: 4px;
  font-family: "Wals";
  transition: 0.3s; 
  cursor: pointer;
}

#btnGoToSignUp {
  margin: auto; 
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: white; 
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: black;
  text-decoration: none;
  border: none;
  height: 35px;
  width: 140px;
  border-radius: 4px;
  font-family: "Wals";
  transition: 0.3s; 
}

#btnGoToSignUp:hover {
  background-color: lightgrey; 
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#btnLogIn:hover {
  background-color: #2022259f;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#makersMark {
  position: absolute; 
  display: block; 
  text-align: center; 
  width: 100%; 
  bottom: 0; 
  color: white;
}

#logInTittel {
  border-bottom: 1px solid;
  width: 75px;
  margin: 20px auto;
  font-family: "Wals";
  color: black;
}

button {
  outline: none;
  cursor: pointer;
}

h1, h2 {
  font-weight: normal;
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
  display: block; 
  color: black;
  font-size: 12px;
  font-family: 'Monsterrat', sans-serif;
  margin-top: 25px;
} 
</style>
