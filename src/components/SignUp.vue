<template>
  <div class="animate__animated animate__fadeIn" id="divSignUpWrapper">
    <h2 id="regUserTittel">
      USER <br />
      SIGNUP
    </h2>
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
      <p id="error2" class="animate__animated animate__shakeX"></p>
      <font-awesome-icon
        id="loadingSpinner"
        :icon="['fas', 'circle-notch']"
        spin
      />
      <input
        type="submit"
        v-on:click="registerUser()"
        value="SIGNUP"
        id="btnRegUser"
      />
    </form>
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
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    };
  },
  methods: {
    registerUser() {
      if (this.regExSignUp()) {
        let self = this;
        document.getElementById("loadingSpinner").style.display = "block";
        let fd = new FormData();
        fd.append("username", this.username);
        fd.append("password", this.password);
        fd.append("email", this.email);

        fetch(self.apiURL + "userSignUp.php", {
          method: "post",
          body: fd
        })
          .then(function(response) {
            return response.text().then(function(text) {
              console.log(text);
              document.getElementById("loadingSpinner").style.display = "none";
              if (text == "Username taken") {
                document.getElementById("error2").style.display = "block";
                document.getElementById("error2").innerHTML =
                  "Username or email has already been taken!";
              } else if (text == "OK") {
                document.getElementById("regUsername").value = "";
                document.getElementById("regEmail").value = "";
                document.getElementById("regPassword").value = "";

                document.getElementById("error2").style.display = "block";
                document.getElementById("error2").style.color = "green";
                document.getElementById("error2").innerHTML =
                  "You have been registered!";
              }
            });
          })
          .catch(function(error) {
            console.error("Error:", error);
            document.getElementById("loadingSpinner").style.display = "none";
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
    }
  }
};
</script>

<style scoped>
#divSignUpWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  padding: 15px;
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
  font-family: "Monsterrat";
}

#error2 {
  color: red;
  display: none;
  font-family: "Monsterrat";
}

#btnRegUser {
  margin: auto;
  margin-top: 20px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: black;
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-decoration: none;
  border: 3px solid black;
  height: 45px;
  width: 140px;
  transition: 0.2s;
  cursor: pointer;
}

#btnRegUser:hover {
  background-color: black;
  color: white;
}

#regUserTittel {
  margin: 20px auto;
  font-family: "Wals";
  font-size: 45px;
  color: black;
}

#loadingSpinner {
  color: black;
  font-size: 40px;
  display: none;
  margin: auto;
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
