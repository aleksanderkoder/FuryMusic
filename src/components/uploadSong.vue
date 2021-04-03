<template>
  <div id="backgroundFade" v-on:click.self="cancel()" class="animate__animated animate__fadeIn">
    <div
      class="animate__animated animate__fadeInDownBig"
      id="divUploadSongWrapper"
    >
      <font-awesome-icon
          style="color: #8b0000; font-size: 25px; position: fixed; right: 25px; top: 15px; cursor: pointer;"
          :icon="['fas', 'times']"
          v-on:click="cancel()"
        />
      <h1>Upload song</h1>
      <form onSubmit="return false">
        <label for="fileSong" id="btnChooseSong"> Select song </label>
        <input
          id="fileSong"
          type="file"
          accept=".mp3"
          v-on:change="showSongForm()"
        />
        <br />
        <div v-show="showForm">
          <span id="spanSelected"></span>
          <font-awesome-icon class="paddingRight" :icon="['fas', 'music']" />
          <input type="text" placeholder="Song name" v-model="songName" />
          <br />
          <font-awesome-icon class="paddingRight" :icon="['fas', 'user']" />
          <input type="text" placeholder="Artist name" v-model="songArtist" />
          <br />
          <font-awesome-icon class="paddingRight" :icon="['fas', 'record-vinyl']" />
          <input type="text" placeholder="Album name" v-model="songAlbum" />
          <br />
          <font-awesome-icon class="paddingRight" :icon="['fas', 'image']" />
          <input type="text" placeholder="Song cover image URL" v-model="songCover" />
          <br />
          <button id="btnConfirmUploadUS" type="submit" v-on:click="uploadSong()">
            Upload
          </button>
        </div>
      </form>
      <font-awesome-icon id="loadingSpinnerUS" :icon="['fas', 'spinner']" spin />
      <p v-show="showError">Invalid information!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadSong",
  data() {
    return {
      songName: "",
      songArtist: "",
      songAlbum: "",
      songCover: "",
      songDuration: 0,
      showForm: false,
      showError: false,
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/",
    };
  },
  methods: {
    showSongForm() {
      
      let self = this;
      let song = document.getElementById("fileSong").files[0];
      if (song.type == "audio/mpeg") {
        let reader = new FileReader();
        let reader2 = new FileReader(); 
        let audio = document.createElement("audio");
        reader.readAsArrayBuffer(song);
        reader.addEventListener("loadend", function () {
          const mp3tag = new MP3Tag(reader.result)
          if(mp3tag.read()) {
            self.songName = mp3tag.tags.title; 
            self.songArtist = mp3tag.tags.artist; 
            self.songAlbum = mp3tag.tags.album; 
          }
        });
        reader2.readAsDataURL(song);
        reader2.addEventListener("loadend", function () {
          audio.src = reader2.result;
          audio.addEventListener("loadedmetadata", function () {
            self.songDuration = audio.duration;
          });
        });
        document.getElementById("spanSelected").innerHTML = song.name;
        this.showForm = true;
      } else {
        Ozone.fire("info", "Only mp3 files can be uploaded", "bottom-middle");
      }
    },
    uploadSong() {
      if(this.regEx()) {
        let self = this;
        document.getElementById("loadingSpinnerUS").style.display = "block";
        document.getElementById("btnConfirmUploadUS").style.display = "none";
        let fd = new FormData();
        let files = document.getElementById("fileSong").files[0];

        fd.append("songName", this.songName);
        fd.append("songArtist", this.songArtist);
        fd.append("songAlbum", this.songAlbum);
        fd.append("songLength", this.songDuration);
        fd.append("publisher", this.$store.state.username);
        fd.append("songCover", this.songCover);
        fd.append("file", files);

        $.ajax({
          url: this.apiURL + "uploadSong.php",
          data: fd,
          processData: false,
          contentType: false,
          type: "POST",
          success: function (data) {
            document.getElementById("loadingSpinnerUS").style.display = "none";
            document.getElementById("btnConfirmUploadUS").style.display = "inline-block";
            let response = JSON.parse(data);
            if (response.status == 1) {
              Ozone.fire("success", response.message, "bottom-middle");
              self.$emit("hideUploadSongComponent");
            } else {
              Ozone.fire("error", response.message, "bottom-middle");
            }
          },error: function (error) {
            document.getElementById("loadingSpinnerUS").style.display = "none";
            document.getElementById("btnConfirmUploadUS").style.display = "inline-block";
            Ozone.fire("error", "Server out of reach", "center");
          }
        });
      }
      
    },
    cancel() {
      this.$emit("hideUploadSongComponent");
    },
    regEx() {
      let regEx = /^[0-9a-zæøåA-ZÆØÅ\s!?/,.-]{1,50}$/;
      let regExImgCover = /^[0-9a-zæøåA-ZÆØÅ%!?=&/:,.-]{0,255}$/;
      if(regEx.test(this.songName) && regEx.test(this.songArtist) && regEx.test(this.songAlbum) && regExImgCover.test(this.songCover)) {
        this.showError = false; 
        return true; 
      }
      this.showError = true;
      return false; 
    }
  }
};
</script>

<style scoped>

#btnChooseSong {
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

#btnConfirmUploadUS:hover {
  background-color: #2a8638;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#btnConfirmUploadUS {
  margin: 20px;
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: white;
  text-decoration: none;
  border: none;
  height: 35px;
  width: 110px;
  border-radius: 4px;
  font-family: "Wals";
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
}

#spanSelected {
  margin-top: 40px; 
  margin-bottom: 10px;
  display: block; 
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
  margin-top: 10%;
  border-radius: 1%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Wals";
  z-index: 2;
}

#loadingSpinnerUS {
  display: none;   
  font-size: 40px; 
  margin: auto;
  margin-top: 30px; 
}

#backgroundFade {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1;
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
  margin-right: 33px;
}

input[type="file"] {
  display: none;
}

.paddingRight {
  padding-right: 10px; 
}

button {
  outline: none;
  cursor: pointer;
}

p {
  color: red; 
}

h1,
h2 {
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
  font-family: "Monsterrat", sans-serif;
  margin-top: 25px;
}
</style>