<template>
  <div id="divLogIn">
    
    <img src="/src/assets/fury logo mindre.png">
    <br>
    <h2 id="logInTittel">SIGN IN</h2>
    <form onSubmit="return false">
      <input type="text" v-model="username" placeholder="Username" id="username"/>
      <br>
      <input type="password" v-model="password" placeholder="Password" id="password"/>
      <br>
      <input type="submit" v-on:click="logIn()" value="SIGN IN" id="btnLogIn"/>
      <p id="error">Wrong username or password!</p>
    </form>
    <button id="btnGoToSignUp" v-on:click="goToSignUp()">SIGN UP</button>

    <br>
    <a href="">Forgot password?</a>
    
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      username: "",
      password: "",
      apiURL: "https://furymusic.000webhostapp.com/Scripts/"
    }
  },
  methods: {
    logIn() {
      $.ajax(
      {
        type:"POST",
        url: this.apiURL + "userLogIn.php",
        dataType: "json",
        data:{username:this.username,password:this.password},
        cache:false,
        success:function (data) {
            if(data != "Wrong info")
            {
              console.log("det gikk");
              document.getElementById("error").style.display = "none";
            }
            else
            {
              document.getElementById("error").style.display = "block";
              console.log("feil")
            }
          },
          error:function(er){
            console.log(er)
          }
      })
    },
    goToSignUp() {
      this.$emit("GoToSignUp")
    }
  }
  }
</script>

<style>
@font-face {
  font-family: "Monsterrat";
  src: url(/src/assets/fonts/Montserrat-Medium.ttf);
}

#divLogIn {
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
#username, #password {
  border: none;
  margin: 15px;
  width: 150px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 30px;
  font-family: 'Monsterrat', sans-serif;
}
#error {
  color: red;
  display: none;
}
#btnLogIn {
  margin: 20px;
  background-color: black;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  min-width: 35%;
  border-radius: 4px;
  font-weight: bold; 
  font-family: 'Monsterrat', sans-serif;
}
#btnGoToSignUp {
  margin: 20px;
  background-color: grey;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  min-width: 35%;
  border-radius: 4px;
  font-weight: bold; 
  font-family: 'Monsterrat', sans-serif;
}
#btnGoToSignUp:hover {
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
#btnLogIn:hover {
  background-color: #202225;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
#logInTittel {
  border-bottom: 2px solid;
  width: 95px;
  margin: 20px auto;
  font-family: 'Monsterrat', sans-serif;
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
