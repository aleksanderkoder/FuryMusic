<template>
  <div id="divSignUp">
    
    <img src="/src/assets/fury logo mindre.png">
    <br>
    <h2 id="regUserTittel">SIGN UP</h2>
    <form onSubmit="return false">
        <p>All fields must be filled</p>
      <input type="text" v-model="regUsername" placeholder="Choose a username" id="regUsername"/>
      <br>
      <input type="text" v-model="regEmail" placeholder="Your email address" id="regEmail"/>
      <br>
      <input type="password" v-model="regPassword" placeholder="Choose a password" id="regPassword"/>
      <br>
      <input type="submit" v-on:click="registerUser()" value="SIGN UP" id="btnRegUser"/>
      <p id="error2">Wrong username or password!</p>
    </form>

    
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
  }
  }
</script>

<style scoped>
@font-face {
  font-family: "Monsterrat";
  src: url(/src/assets/fonts/Montserrat-Medium.ttf);
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
  font-family: 'Monsterrat', sans-serif;
}
#error2 {
  color: red;
  display: none;
}
#btnRegUser {
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
#btnRegUser:hover {
  background-color: #202225;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
#regUserTittel {
  border-bottom: 2px solid;
  width: 105px;
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