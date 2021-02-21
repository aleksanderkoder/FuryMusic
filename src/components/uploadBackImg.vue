<template>
    <div class="animate__animated animate__fadeInDownBig" id="divCustomBackImgWrapper">
        <h1>Upload custom background image</h1>
        <input id="file" type="file" accept="image/*" v-on:change="upload()">
        <br />
        <img src="" id="bilde" width="450px">
        <div id="test" style=" width: auto; height: auto; background-repeat: no-repeat;"></div>
    </div>
</template>

<script>
export default {
  name: 'uploadBackImg',
  data () {
    return {

    }
  },
  methods: {
    upload() {
        localStorage.setItem("filendin", URL.createObjectURL(document.getElementById("file").files[0]))
        console.log(localStorage.getItem("filendin"))
        document.getElementById("bilde").src = localStorage.getItem("filendin")
        document.getElementById("test").style.backgroundImage = "url(" + localStorage.getItem('filendin') + ")"
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

#divCustomBackImgWrapper {
    width: 800px;
    height: auto; 
    margin: auto;
    text-align: center;
    background-color: white; 
    margin-top: 5%;
    border-radius: 1%; 
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-family: "Monsterrat";
}

button {
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
  color: white;
  font-size: 12px;
  font-family: 'Monsterrat', sans-serif;
  margin-top: 25px;
} 
</style>
