<template>
  <div id="pageWrapper">
    <div class="animate__animated animate__fadeInDownBig" id="divLogInWrapper">
      <div id="divLeft">
        <img
          src="../assets/fury-logo-prototype old large smaller.webp"
          title="Fury Music"
          alt="Fury Music logo"
          width="250"
        />
        <h1 id="divLeftTitle">FURY MUSIC</h1>
        <h2 id="h2Description">Don't have an account?</h2>
        <button
          id="btnGoToSignUp"
          v-on:click="goToSignUp()"
          class="btnSecondary"
        >
          SIGN UP
        </button>
      </div>
      <div id="divRight">
        <div id="divLogIn" v-show="showLogInForm">
          <h2 id="logInTittel">
            USER <br />
            LOGIN
          </h2>
          <form onSubmit="return false">
            <font-awesome-icon
              class="fontAwesome"
              style="color: black"
              :icon="['fas', 'user']"
            />
            <input
              type="text"
              v-model="username"
              placeholder="Username"
              id="username"
            />
            <br />
            <font-awesome-icon
              class="fontAwesome"
              style="color: black"
              :icon="['fas', 'lock']"
            />
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              id="password"
            />
            <br />
            <p id="error" class="animate__animated animate__shakeX"></p>
            <input
              type="submit"
              v-on:click="signIn()"
              value="LOGIN"
              id="btnLogIn"
            />
          </form>
          <br />
          <br />
          <font-awesome-icon
            id="loadingSpinner"
            :icon="['fas', 'circle-notch']"
            spin
          />
          <a href="">Forgot password?</a>
        </div>
        <SignUp v-show="showSignUpForm" />
      </div>
    </div>
    <p id="makersMark">
      © 2021 Aleksander Johansen
    </p>
  </div>
</template>

<script>
import SignUp from "./SignUp.vue";

export default {
  name: "SignIn",
  components: {
    SignUp
  },
  data() {
    return {
      username: "",
      password: "",
      showLogInForm: false,
      showSignUpForm: false,
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    };
  },
  methods: {
    signIn() {
      let self = this;
      document.getElementById("loadingSpinner").style.display = "block";
      document.getElementById("btnLogIn").style.display = "none";
      document.getElementById("error").style.display = "none";

      if (this.regExSignIn()) {
        let fd = new FormData();
        fd.append("username", this.username);
        fd.append("password", this.password);

        fetch(self.apiURL + "userSignIn.php", {
          method: "post",
          body: fd
        })
          .then(function(response) {
            return response.text().then(function(text) {
              console.log(text);
              document.getElementById("loadingSpinner").style.display = "none";
              document.getElementById("btnLogIn").style.display = "block";

              if (text != "Wrong info") {
                console.log("Logging in user...");

                localStorage.setItem("username", self.username);
                localStorage.setItem("password", self.password);

                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                document.getElementById("error").style.display = "none";
                self.$store.commit("showPlayer");
                self.$store.commit("updateUsername", self.username);
                self.$emit("fetchSongsGrant");

                let time = new Date();
                time = time.getHours();
                let greeting = "";
                if (time < 8) {
                  greeting = "Good morning, ";
                } else if (time >= 8 && time < 18) {
                  greeting = "Good day, ";
                } else if (time >= 18) {
                  greeting = "Good evening, ";
                }
                setTimeout(function() {
                  Ozone.fire(
                    "info",
                    greeting + self.$store.state.username + "!",
                    "bottom-middle"
                  );
                }, 2000);
              } else {
                document.getElementById("error").style.display = "block";
                document.getElementById("error").innerHTML =
                  "Wrong username or password!";
                console.log("feil");
              }
              self.username = "";
              self.password = "";
            });
          })
          .catch(function(error) {
            console.log(error);
            document.getElementById("loadingSpinner").style.display = "none";
            document.getElementById("btnLogIn").style.display = "block";
            Ozone.fire("error", "Server out of reach", "top-right");
          });
      } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("error").innerHTML =
          "Please provide a valid username and password!";
        document.getElementById("btnLogIn").style.display = "block";
      }
    },
    regExSignIn() {
      // Regular expression for sign in form
      let regEx1 = /^[0-9a-zæøåA-ZÆØÅ]{3,99}$/;
      let regEx2 = /^[0-9a-zæøåA-ZÆØÅ!?,.-]{6,99}$/;

      let ok1 = regEx1.test(this.username);
      let ok2 = regEx2.test(this.password);

      if (!ok1 || !ok2) {
        return false;
      } else {
        return true;
      }
    },
    goToSignUp() {
      if (this.showLogInForm) {
        document.getElementById("error").style.display = "none";
        document.getElementById("btnGoToSignUp").innerHTML = "LOGIN";
        document.getElementById("h2Description").innerHTML =
          "Already have an account?";
        this.showSignUpForm = true;
        this.showLogInForm = false;
      } else {
        document.getElementById("btnGoToSignUp").innerHTML = "SIGN UP";
        document.getElementById("h2Description").innerHTML =
          "Don't have an account?";
        this.showLogInForm = true;
        this.showSignUpForm = false;
      }
    }
  },
  mounted() {
    // Checks if user information has been already entered, and logs user in if true
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
      this.username = localStorage.getItem("username");
      this.password = localStorage.getItem("password");
      this.signIn();
    } else {
      // Shows alert if song is linked, but user is not signed in
      const urlParams = new URLSearchParams(window.location.search);
      let songid = urlParams.get("songid");
      if (songid != null) {
        setTimeout(function() {
          Ozone.fire(
            "info",
            "Linked song will play after sign in",
            "top-right"
          );
        }, 1500);
      }
    }

    // Fades in login form after 1 second from mounted
    setTimeout(() => {
      document.getElementById("divLogIn").className =
        "animate__animated animate__fadeIn";
      this.showLogInForm = true;
    }, 1000);
  }
};
</script>

<style scoped>
#pageWrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(5px);
}

#divRight {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  padding: 15px;
}

#divLeft {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  background: url("../assets/def-back-login (1).webp")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#divLeftTitle {
  font-size: 45px;
  margin-bottom: 50px;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
}

.btnSecondary {
  width: 115px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: transparent;
  border: 3px solid white;
  color: white;
  font-size: 18px;
  transition: 0.2s;
}

.btnSecondary:hover {
  background-color: white;
  color: black;
}

h1 {
  color: white;
  font-size: 32px;
}

h2 {
  color: white;
  font-size: 26px;
}

#divLogInWrapper {
  text-align: center;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 1);
  width: 1200px;
  min-height: 675px;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Wals";
}

#loadingSpinner {
  color: black;
  font-size: 40px;
  display: none;
  margin: auto;
}

#username,
#password {
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

#btnLogIn:hover {
  background-color: black;
  color: white;
}

#makersMark {
  position: absolute;
  display: block;
  text-align: center;
  width: 100%;
  bottom: 15px;
  color: white;
}

#logInTittel {
  margin: 20px auto;
  font-family: "Wals";
  font-size: 45px;
  color: black;
}

.fontAwesome {
  font-size: 16px;
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
  display: block;
  color: black;
  font-size: 12px;
  font-family: "Monsterrat", sans-serif;
  margin-top: 25px;
}

@media screen and (min-width: 3840px) {
  #divLogInWrapper {
    width: 800px;
    min-height: 1340px;
    padding: 40px;
  }

  #loadingSpinner {
    font-size: 80px;
  }

  #username,
  #password {
    margin: 30px;
    margin-right: 66px;
    width: 310px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 4px 8px;
    font-size: 24px;
    height: 60px;
  }

  #btnLogIn {
    margin-top: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 16px;
    height: 70px;
    width: 280px;
    font-size: 24px;
  }

  #btnLogIn:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 16px;
  }

  #makersMark {
    font-size: 24px;
  }

  #logInTittel {
    margin: 40px auto;
    font-family: "Wals";
    font-size: 90px;
    color: black;
  }

  a {
    margin-top: 40px;
    font-size: 24px;
  }

  .fontAwesome {
    font-size: 32px;
  }
}
</style>
