<template>
  <div id="backgroundOpacity">

    <div class="animate__animated animate__backInLeft" id="divLogInWrapper">
      <img class="animate__animated animate__pulse animate__slow animate__infinite" src="/src/assets/fury music logo ferdig.png">
      <br>
      <h2 id="logInTittel">Sign in</h2>
      <form onSubmit="return false">
        <font-awesome-icon style="color: black" :icon="['fas', 'user']" />
        <input type="text" v-model="username" placeholder="Username" id="username"/>
        <br>
        <font-awesome-icon style="color: black" :icon="['fas', 'lock']" />
        <input type="password" v-model="password" placeholder="Password" id="password"/>
        <br>
        <p id="error" class="animate__animated animate__shakeX"></p>
        <input type="submit" v-on:click="logIn()" value="Sign in" id="btnLogIn"/>
      </form>
      <button id="btnGoToSignUp" v-on:click="goToSignUp()">Sign up</button>
      <br>
      <a href="">Forgot password?</a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      username: "",
      password: "",
      apiURL: "https://furymusic.000webhostapp.com/scripts/"
    }
  },
  methods: {
    logIn() {

      var self = this; 
      if(this.username != "" && this.password != "") 
      {
        $.ajax(
        {
          type:"POST",
          url: this.apiURL + "userLogIn.php",
          dataType: "json",
          data:{username:this.username,password:this.password},
          cache:false,
          success: function (data) {
            
              if(data != "Wrong info")
              {
                console.log("Logging in user...")
                document.getElementById("error").style.display = "none"
                self.$emit("GoToPlayer")
              }
              else
              {
                document.getElementById("error").style.display = "block"
                document.getElementById("error").innerHTML = "Wrong username or password!"
                console.log("feil")
                
              }
            },
            error:function(er){
              console.log(er)
            }
          })
      }
      else
      {
        document.getElementById("error").style.display = "block"
        document.getElementById("error").innerHTML = "Please provide your username and password!"
      }
      
    },
    goToSignUp() {
      this.$emit("GoToSignUp")
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
#backgroundOpacity {
  opacity: 0.95;
}
#divLogInWrapper {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white; 
  min-width: 400px;
  max-width: 400px;
  margin: auto;
  margin-top: 5%;
  border-radius: 1%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Monsterrat";

}
#username, #password {
  border: none;
  margin: 15px;
  width: 150px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 30px;
  font-family: "Wals";

}
#error {
  color: red;
  display: none;
  font-family: "Monsterrat";
}
#btnLogIn {
  margin-top: 20px;
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  min-width: 35%;
  border-radius: 4px;
  font-family: "Wals";
}
#btnGoToSignUp {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: darkgrey;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  min-width: 35%;
  border-radius: 4px;
  font-family: "Wals";
}
#btnGoToSignUp:hover {
  background-color:#202225;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
#btnLogIn:hover {
  background-color: #202225;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
#logInTittel {
  border-bottom: 2px solid;
  width: 75px;
  margin: 20px auto;
  font-family: "Wals";
  color: black;
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
  color: #202225;
  font-size: 15px;
  font-family: 'Monsterrat', sans-serif;
}
</style>
