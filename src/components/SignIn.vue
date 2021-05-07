<template>
  <div id="pageWrapper">
    <div class="animate__animated animate__fadeInDownBig" id="divLogInWrapper">
      <img
        id="logo"
        class="animate__animated animate__pulse animate__slow animate__infinite"
        src="../assets/fury music logo ferdig.png"
      />
      <br />
      <h2 id="logInTittel">Sign in</h2>
      <form onSubmit="return false">
        <font-awesome-icon class="fontAwesome" style="color: black" :icon="['fas', 'user']" />
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          id="username"
        />
        <br />
        <font-awesome-icon class="fontAwesome" style="color: black" :icon="['fas', 'lock']" />
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
          v-on:click="logIn()"
          value="Sign in"
          id="btnLogIn"
        />
      </form>
      <button id="btnGoToSignUp" v-on:click="goToSignUp()">Sign up</button>
      <br />
      <br />
      <font-awesome-icon
        id="loadingSpinner"
        :icon="['fas', 'circle-notch']"
        spin
      />
      <a href="">Forgot password?</a>
    </div>
    <p id="makersMark">
      © 2021 Aleksander Johansen
    </p>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    };
  },
  methods: {
    logIn() {
      let self = this;
      document.getElementById("loadingSpinner").style.display = "block";
      document.getElementById("btnLogIn").style.display = "none";
      document.getElementById("btnGoToSignUp").style.display = "none";
      document.getElementById("error").style.display = "none";

      if (this.regExLogIn()) {
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
              document.getElementById("btnGoToSignUp").style.display = "block";

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
            document.getElementById("btnGoToSignUp").style.display = "block";
            Ozone.fire("error", "Server out of reach", "top-right");
          });
      } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("error").innerHTML =
          "Please provide a valid username and password!";
        document.getElementById("btnLogIn").style.display = "block";
        document.getElementById("btnGoToSignUp").style.display = "block";
      }
    },
    regExLogIn() {
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
      document.getElementById("error").style.display = "none";
      this.$store.commit("showSignUp");
    }
  },
  mounted() {
    // Checks if user information has been already entered, and logs user in if true
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
      this.username = localStorage.getItem("username");
      this.password = localStorage.getItem("password");
      this.logIn();
    }

  }
};
</script>

<style scoped>

#pageWrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #logo {
    width: 250px; 
  }

  #divLogInWrapper {
    text-align: center;
    color: #2c3e50;
    background-color: rgba(255, 255, 255, 1);
    width: 400px;
    min-height: 670px;
    margin: auto;
    /* margin-top: 6.5%; */
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
 
#logo {
  width: 500px;
}

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

  #btnGoToSignUp {
    margin-top: 40px;
    margin-bottom: 40px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 16px;
    height: 70px;
    width: 280px;
    font-size: 24px;
  }

  #btnGoToSignUp:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 16px;
  }

  #btnLogIn:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 16px;
  }

  #makersMark {
    font-size: 24px; 
  }

  #logInTittel {
    border-bottom: 2px solid;
    width: 150px;
    margin: 40px auto;
    font-size: 48px;
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
