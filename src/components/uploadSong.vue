<template>
    <div class="animate__animated animate__fadeInDownBig" id="divUploadSongWrapper">
        <h1>Upload song</h1>
        <label for="fileSong" id="btnChooseSong">
          Select song 
        </label>
        <input id="fileSong" type="file" accept=".mp3" v-on:change="showSongForm()">
        <br>
        <div v-show="showForm">
          <p id="pSelected"></p>
          <input type="text" placeholder="Song name" v-model="songName">
          <br>
          
          <input type="text" placeholder="Artist name" v-model="songArtist">
          <br>
          
          <input type="text" placeholder="Album name" v-model="songAlbum">
          <br>
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
    showSongForm () {
      this.showForm = true
      let song = document.getElementById("fileSong").files[0]
      let reader = new FileReader()
      var audio = document.createElement("audio") 
      reader.readAsDataURL(song)
      reader.addEventListener("loadend", function () {
        audio.src = reader.result
        audio.addEventListener("loadedmetadata", function () {
          alert(audio.duration) 
        })
          
      })
      document.getElementById("pSelected").innerHTML = "Selected: " + song.name
    },
    uploadSong () {
      var fd = new FormData()
      let files = document.getElementById("fileSong").files[0]
      alert(files)
      fd.append("songName", this.songName)
      fd.append("songArtist", this.songArtist)
      fd.append("songAlbum", this.songAlbum)
      fd.append("file", files)

      $.ajax({
        url: this.apiURL + "uploadSong.php",
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data){
          if (data.status == 1)
          {
            Ozone.fire("success", data.message, "bottom-middle")
          }
          else
          {
            Ozone.fire("error", data.message, "bottom-middle")
          }
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
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  border-radius: 4px;
  font-family: "Wals";
  padding: 10px;
  cursor: pointer;
  transition: 0.3s; 
}

#btnChooseSong:hover {
  background-color: #202225;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#btnConfirmUpload:hover {
  background-color: #2a8638;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#btnCancel {
  bottom: 10px;
  margin: 20px;
  background-color:#8b0000;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  background-color: white; 
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
  margin-top: 25px;
  width: 155px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 4px; 
  height: 30px;
  font-family: "Wals";
  border-radius: 3px;
  display: inline-block; 
}

input[type="file"] {
  display: none;
}

button {
  outline: none; 
  cursor: pointer;
}

p {
  margin-top: 40px; 
}

h1, h2 {
  font-weight: normal;
  color: black;
  margin-bottom: 45px; 
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