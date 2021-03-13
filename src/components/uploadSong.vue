<template>
    <div class="animate__animated animate__fadeInDownBig" id="divUploadSongWrapper">
        <h1>Upload song</h1>
        <label for="fileSong" id="btnChooseSong">
          Select song 
        </label>
        <input id="fileSong" type="file" accept=".mp3">
        <br>
        
        <button id="btnCancel">Cancel</button>
    </div>
</template>

<script>
export default {
  name: 'UploadSong',
  data () {
    return {
    }
  },
  methods: {
    
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

#btnConfirmUpload, #btnChooseSong {
  margin: 20px;
  background-color:#3c3e41af;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  border-radius: 4px;
  font-family: "Wals";
  padding: 10px;
  transition: 0.3s; 
  cursor: pointer;
}

#btnChooseSong:hover {
  background-color: #202225;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#btnConfirmUpload:hover {
  background-color: #107421;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#btnCancel {
  bottom: 10px;
  margin: 20px;
  background-color:#8b0000;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  border-radius: 4px;
  font-family: "Wals";
  padding: 10px;
  transition: 0.3s; 
  cursor: pointer;
}

#btnCancel:hover {
  background-color: #741010;
}

#divUploadSongWrapper {
  position: absolute;
  width: 600px;
  min-height: 450px; 
  margin-left: auto;
  margin-right: auto; 
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.85); 
  margin-top: 8%;
  border-radius: 1%; 
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Wals";
  z-index: 9999;
}

#divConfirm {
  display: none; 
}

input[type="file"] {
  display: none;
}

button {
  cursor: pointer;
}

h1, h2 {
  font-weight: normal;
  color: white;
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