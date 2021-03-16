<template>
    <div class="animate__animated animate__fadeInDownBig" id="divUploadSongWrapper">
        <h1>Upload song</h1>
        <label for="fileSong" id="btnChooseSong">
          Select song 
        </label>
        <input id="fileSong" type="file" accept=".mp3" v-on:change="showForm = true">
        <br>
        <div v-show="showForm">
          <input type="text" placeholder="Song name" v-model="songName">
          <input type="text" placeholder="Artist name" v-model="songArtist">
          <input type="text" placeholder="Album name" v-model="songAlbum">
          <button id="btnConfirmUpload" v-on:click="uploadSong()">Upload</button>
        </div>
        <button id="btnCancel" v-on:click="cancel()">Cancel</button>
    </div>
</template>

<script>
export default {
  name: 'UploadSong',
  data () {
    return {
      songName: "",
      songArtist: "",
      songAlbum: "",
      showForm: false,
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    }
  },
  methods: {
    uploadSong () {
      let fd = new FormData()
      let files = document.getElementById("fileSong").files[0]
      alert(files)
      fd.append("songName", this.songName)
      fd.append("songArtist", this.songArtist)
      fd.append("songAlbum", this.songAlbum)
      fd.append("file", files)
      alert(fd.get("songArtist"))

      $.ajax(
          {
            type: "POST",
            url: this.apiURL + "uploadSong.php",
            dataType: "json",
            cache: false,
            async: true,
            success:function (data) {
                console.log(data)
                
              },
              error:function(er){
                console.log(er)
              }
          })
    },
    cancel () {
      this.$emit("hideUploadSongComponent")
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
  margin: 0 auto;  
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

input[type="text"] {
  border: none;
  margin: auto;
  margin-top: 20px;
  width: 155px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 4px; 
  height: 30px;
  font-family: "Wals";
  border-radius: 3px;
  display: block; 
}

input[type="file"] {
  display: none;
}

button {
  outline: none; 
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