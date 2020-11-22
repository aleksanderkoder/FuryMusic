<template>
  <div class="animate__animated animate__fadeIn" id="divSignUp">
    
    <img class="animate__animated animate__pulse animate__slow animate__infinite" src="/src/assets/fury logo mindre.png">
    <br>
    <h2 id="regUserTittel">Sign up</h2>
    <form onSubmit="return false">
      <p id="error2" class="animate__animated animate__shakeX">Wrong username or password!</p>
      <font-awesome-icon style="color: black" :icon="['fas', 'user']" />
      <input type="text" v-model="regUsername" placeholder="Choose a username" id="regUsername"/>
      <br>
      <font-awesome-icon style="color: black" :icon="['fas', 'at']" />
      <input type="text" v-model="regEmail" placeholder="Your email address" id="regEmail"/>
      <br>
      <font-awesome-icon style="color: black" :icon="['fas', 'lock']" />
      <input type="password" v-model="regPassword" placeholder="Choose a password" id="regPassword"/>
      <br>
      <input type="submit" v-on:click="registerUser()" value="Sign up" id="btnRegUser"/>
    </form>
    <button id="btnBack" v-on:click="goToSignIn()">Back to sign in</button>
    
  </div>
</template>

<script>
export default {
  name: 'regUser',
  data () {
    return {
      regUsername: "",
      regPassword: "",
      regEmail: "",
      apiURL: "https://furymusic.000webhostapp.com/Scripts/"
    }
  },
  methods: {
    registerUser() {
      if(this.regUsername != "" && this.regPassword != "" && this.regEmail != "")
      {
        $.ajax(
          {
            type:"POST",
            url: this.apiURL + "userRegister.php",
            dataType: "json",
            data:{username:this.regUsername,password:this.regPassword,email:this.regEmail},
            cache:false,
            success:function (data) {
                console.log(data)

                if(data == "Error")
                {
                  document.getElementById("error2").style.display = "block";
                  document.getElementById("error2").innerHTML = "Username or email has already been taken!";
                }
                else
                {
                  document.getElementById("error2").style.display = "block";
                  document.getElementById("error2").style.color = "green";
                  document.getElementById("error2").innerHTML = "You have been registered!";
                  
                }
              },
              error:function(er){
                console.log(er)
              }
          })
      }
      else
      {
        document.getElementById("error2").style.display = "block";
        document.getElementById("error2").innerHTML = "All fields must be filled!"
      }},
      goToSignIn() {
      this.$emit("GoToSignIn")
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

#divSignUp {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  /* opacity: 95%; */
  min-width: 400px;
  max-width: 400px;
  margin: auto;
  margin-top: 10%;
  border-radius: 1%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: 'Monsterrat', sans-serif;
}
#regUsername, #regPassword, #regEmail {
  border: none;
  margin: 15px;
  width: 150px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 30px;
  font-family: 'Wals';
}
#error2 {
  color: red;
  display: none;
}
#btnRegUser {
  margin-top: 20px;
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  min-width: 35%;
  border-radius: 4px;
  font-weight: bold; 
  font-family: 'Wals';
}
#btnRegUser:hover {
  background-color: #202225;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
#regUserTittel {
  border-bottom: 2px solid;
  width: 85px;
  margin: 20px auto;
  font-family: 'Wals';
}
#btnBack {
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
#btnBack:hover {
  background-color:#202225;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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