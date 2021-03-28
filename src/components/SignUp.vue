<template>
  <div id="pageWrapper">
    <div class="animate__animated animate__fadeInDown" id="divSignUpWrapper">
      <img
        class="animate__animated animate__pulse animate__slow animate__infinite"
        src="../assets/fury music logo ferdig.png"
      />
      <br />
      <h2 id="regUserTittel">Sign up</h2>
      <form onSubmit="return false">
        <font-awesome-icon style="color: black" :icon="['fas', 'user']" />
        <input
          type="text"
          v-model="username"
          placeholder="Choose a username"
          id="regUsername"
        />
        <br />
        <font-awesome-icon style="color: black" :icon="['fas', 'at']" />
        <input
          type="text"
          v-model="email"
          placeholder="Your email address"
          id="regEmail"
        />
        <br />
        <font-awesome-icon style="color: black" :icon="['fas', 'lock']" />
        <input
          type="password"
          v-model="password"
          placeholder="Choose a password"
          id="regPassword"
        />
        <br />
        <p
          id="errors"
          v-for="error in errors"
          :key="error"
          class="animate__animated animate__shakeX"
        >
          {{ error }}
        </p>
        <p id="error2" class="animate__animated animate__fadeInRight"></p>
        <input
          type="submit"
          v-on:click="registerUser()"
          value="Sign up"
          id="btnRegUser"
        />
      </form>
      <button id="btnBack" v-on:click="goToSignIn()">Back to sign in</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      errors: [],
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/",
    };
  },
  methods: {
    registerUser() {
      if (this.regExSignUp()) {
        $.ajax({
          type: "POST",
          url: this.apiURL + "userSignUp.php",
          dataType: "json",
          data: {
            username: this.username,
            password: this.password,
            email: this.email,
          },
          cache: false,
          success: function (data) {
            if (data == "Username taken") {
              document.getElementById("error2").style.display = "block";
              document.getElementById("error2").innerHTML =
                "Username or email has already been taken!";
            } else if (data == "OK") {
              document.getElementById("regUsername").value = "";
              document.getElementById("regEmail").value = "";
              document.getElementById("regPassword").value = "";

              document.getElementById("error2").style.display = "block";
              document.getElementById("error2").style.color = "green";
              document.getElementById("error2").innerHTML =
                "You have been registered!";
            }
          },
          error: function (er) {
            console.log(er);
          },
        });
      }
    },
    regExSignUp() {
      this.errors = [];
      if (this.username != "" && this.password != "" && this.email != "") {
        let regExUsername = /^[0-9a-zæøåA-ZÆØÅ]{3,99}$/;
        let regExEmail = /^[^@]+@\w+(\.\w+)+\w$/;
        let regExPassword = /^[0-9a-zæøåA-ZÆØÅ!?,.-]{6,99}$/;

        let errorCounter = 0;
        if (!regExUsername.test(this.username)) {
          this.errors.push("Your username is not valid!");
          errorCounter++;
        }
        if (!regExEmail.test(this.email)) {
          this.errors.push("Your e-mail is not valid!");
          errorCounter++;
        }
        if (!regExPassword.test(this.password)) {
          this.errors.push("Your password is not valid!");
          errorCounter++;
        }

        if (errorCounter == 0) {
          return true;
        } else {
          return false;
        }
      } else {
        this.errors.push("Please enter your information above!");
      }
    },
    goToSignIn() {
      this.errors = [];
      document.getElementById("error2").style.display = "none";
      this.$store.commit("showSignIn");
    },
  },
};
</script>

<style scoped>

#pageWrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

#divSignUpWrapper {
  text-align: center;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 1);
  width: 400px;
  min-height: 670px;
  margin: auto;
  border-radius: 1%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Monsterrat";
}

#regUsername,
#regPassword,
#regEmail {
  border: none;
  margin: 15px;
  width: 150px;
  margin-right: 33px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 30px;
  font-family: "Wals";
}

#errors {
  color: red;
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
  width: 140px;
  border-radius: 4px;
  font-family: "Wals";
  transition: 0.3s;
  cursor: pointer;
}

#btnRegUser:hover {
  background-color: #2022259f;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#regUserTittel {
  border-bottom: 2px solid;
  width: 85px;
  margin: 20px auto;
  font-family: "Wals";
  color: black;
}

#btnBack {
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

#btnBack:hover {
  background-color: lightgrey;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

button {
  outline: none;
  cursor: pointer;
}

h1,
h2 {
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
  font-family: "Monsterrat", sans-serif;
}
</style>