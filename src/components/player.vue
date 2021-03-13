<template>
<div id="divPlayerWrapper">
    <div id="divTopbar" class="animate__animated animate__fadeInDown">
      <img id="logo" src="/src/assets/fury music logo round small.png" width="80px">
      <div id="divUser">
        <font-awesome-icon style="color: black" :icon="['fas', 'user-circle']" />
        {{this.$store.state.username}}
      </div>
      <button id="btnSignOut" v-on:click="signOut()">
        <font-awesome-icon style="color: white" :icon="['fas', 'times-circle']" />
        Sign out
        </button>
    </div>

    <div id="divSidebar" class="animate__animated animate__fadeInLeft">
      <h3 id="h3Library">Your library</h3>
      
      <a>All public songs</a>
      <br>
      <a>My uploaded songs</a>

      <h3>Playlists</h3>
      
      <button id="btnUploadSong">
        <font-awesome-icon style="color: grey" :icon="['fas', 'plus']" />
        Upload song
      </button>

      <div id="divSidebarCurrentSongInfo" v-if="currentSongName != ''" class="animate__animated animate__fadeInLeft">
        <p style="font-weight: bold">{{currentSongName}}</p>
        <p>{{currentArtistName}}</p>
      </div>
    </div>

    <div id="divCenter">
      <div v-if="loggedIn">
        <div id="divCenterTableHeader" class="animate__animated animate__fadeInRight">
          <table  class="tableSongsHeader">
            <tr>
              <td class="tableSongsHeaderTitle">
                <span>Title</span>
              </td>
              <td class="tableSongsHeaderArtist">
                <span>Artist</span>
              </td>
               <td class="tableSongsHeaderLength">
                <span>Length</span>
              </td> 
            </tr>
          </table>
        </div>
        <div id="divSongPane" v-for="song in songs" :key="song.SongID" class="animate__animated animate__fadeInRight">
          <table class="tableSongs">
            <tr>
              <td class="tableSongsTdPlay">
                <font-awesome-icon v-bind:id="'play' + song.SongID" v-on:click="playSong(song.SongURL, song.SongID, song.SongName, song.ArtistName)" style="color: black; cursor: pointer;" :icon="['fas', 'play']" />
                <font-awesome-icon v-bind:id="'pause' + song.SongID" v-on:click="pauseSong(song.SongID)" style="color: black; cursor: pointer; display: none" :icon="['fas', 'pause']" />
              </td>
              <td class="tableSongsTdSongName">
                {{song.SongName}}
              </td>
              <td class="tableSongsTdArtistName">
                {{song.ArtistName}}
              </td>
               <td class="tableSongsTdSongLength"> <!-- TODO: add song length -->
                {{song.Length}}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div id="customBackgroundImagePanel" @mouseover="uploadImgLabel = true"
      @mouseleave="uploadImgLabel = false" v-on:click="showCustomBackImg = true">
        <span v-show="uploadImgLabel" class="animate__animated animate__bounceIn">Change background image</span>
        <font-awesome-icon :icon="['fas', 'image']" />
      </div>

      <div id="divSongDuration">
        <span id="spanSongDuation">Do here</span>
      </div>

    </div>

    <div id="divPlayerControls" class="animate__animated animate__fadeInUp">
      <div id="controlsWrapper">
      <div id="divPlay" v-on:click="wavePlayPauseToggle('play')">
        <font-awesome-icon id="playButton" style="font-size: 35px; color: black; margin-top: 27%; margin-left: 12%" :icon="['fas', 'play']" />
      </div>
       <div id="divPause" v-on:click="wavePlayPauseToggle('pause')">
        <font-awesome-icon id="pauseButton" style="font-size: 35px; color: black; margin-top: 27%; margin-left: 2%;" :icon="['fas', 'pause']" />
      </div>
      <input type="range" min="0" max="100" value="100" id="wavesurferVolume">
      </div>
      <div id="waveform" v-on:click="waveformInteraction()">
        <div id="songLoader">
          <font-awesome-icon :icon="['fas', 'spinner']" spin />
          <span id="songLoaderProgress"></span>
        </div>
      </div>
    </div>

    <uploadBackImg v-show="showCustomBackImg" 
    @hideCustomBackgroundImagePanel="showCustomBackImg = false" />

</div>
</template>

<script>
import uploadBackImg from "./UploadBackImg.vue"

export default {
  name: 'player',
  components: {
    uploadBackImg
  },
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      wavesurfer: null,
      songs: [],
      currentSong: null, // Not used for now
      currentSongID: "",
      currentSongName: "",
      currentArtistName: "",
      showCustomBackImg: false,
      uploadImgLabel: false,
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    }
  },
  props: {
    loggedIn: Boolean
  },
  methods: {
    wavePlayPauseToggle (mode) {
      if (mode == "play")
      {
        this.wavesurfer.play()
        document.getElementById("divPlay").style.display = "none"
        document.getElementById("divPause").style.display = "block"
        document.getElementById("play" + this.currentSongID).style.display = "none"
        document.getElementById("pause" + this.currentSongID).style.display = "block"
      }
      else
      {
        this.wavesurfer.pause()
        document.getElementById("divPause").style.display = "none"
        document.getElementById("divPlay").style.display = "block"
        document.getElementById("pause" + this.currentSongID).style.display = "none"
        document.getElementById("play" + this.currentSongID).style.display = "block"
      }
    },
    playSong (SongURL, SongID, SongName, ArtistName) {
      document.getElementById("divPlayerControls").style.display = "block"
      
      // If no song is selected, load selected song
      if (this.currentSongID == "")
      {
        this.currentSongName = SongName
        this.currentArtistName = ArtistName
        this.currentSongID = SongID
        this.wavesurfer.load(SongURL)
        //alert("first")
      }
      // Continues paused/plays loaded song
      else if (this.currentSongID == SongID)
      {
          this.wavesurfer.play()
          document.getElementById("pause" + SongID).style.display = "block"
          document.getElementById("play" + SongID).style.display = "none"
          document.getElementById("divPlay").style.display = "none"
          document.getElementById("divPause").style.display = "block"
        //alert("cont")
      }
      // If a song has been selected before, but it's not the same song
      else
      {
        document.getElementById("play" + this.currentSongID).style.display = "block"
        document.getElementById("pause" + this.currentSongID).style.display = "none"
        document.getElementById("divPlay").style.display = "block"
        document.getElementById("divPause").style.display = "none"
        this.currentSongID = SongID
        this.currentSongName = SongName
        this.currentArtistName = ArtistName
        this.wavesurfer.load(SongURL)
        //alert("new")
      }
    },
    pauseSong (SongID) {
      this.wavesurfer.pause()
      document.getElementById("play" + SongID).style.display = "block"
      document.getElementById("pause" + SongID).style.display = "none"
      document.getElementById("divPlay").style.display = "block"
      document.getElementById("divPause").style.display = "none"
      
    },
    populateSongList (songs) {
      for (var i = 0; i < songs.length; i+=4) 
      {
          this.songs.push({SongID: songs[i], ArtistName: songs[i+1], SongName: songs[i+2]
            , SongURL: songs[i+3]})
      } 
    },
    waveformInteraction () {
      let self = this
      if (this.wavesurfer.isPlaying())
      {
        setTimeout(function() {
          self.wavesurfer.play()
        }, 100)
      }
    },
    signOut () {
      window.location.replace(location + "?signedout=true") 
      //location.reload() 
    }
  },
  watch: {
    loggedIn: function () {
      console.log("Fetching all songs...")
      var self = this
      $.ajax(
          {
            type: "POST",
            url: this.apiURL + "getAllSongs.php",
            dataType: "json",
            cache: false,
            async: true,
            success:function (data) {
                console.log(data)
                if (data != "Error occurred when fetching all songs")
                {
                  self.populateSongList(data)
                }
                else
                {
                  console.log("ERROR: " + data)
                }
              },
              error:function(er){
                console.log(er)
              }
          })
    },
  },
  mounted () {
    let self = this
    
    // Initializes the WaveSurfer object
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        progressColor: 'black',
        barWidth: '2',
        normalize: true,
        fillParent: true,
      })

    // Prepares event for when song finishes
    this.wavesurfer.on('finish', function () {
          document.getElementById("play" + self.currentSongID).style.display = "block"
          document.getElementById("pause" + self.currentSongID).style.display = "none"
          document.getElementById("divPlay").style.display = "block"
          document.getElementById("divPause").style.display = "none"
        })

    this.wavesurfer.on('loading', function (progress) {
          console.log("Loading progress: " + progress)
          
          if (progress < 100)
          {
            document.getElementById("songLoader").style.display = "block"
            document.getElementById("songLoaderProgress").innerHTML = progress + "%"
            
          }
          else
          {
            document.getElementById("songLoader").style.display = "none"
          }

        })

    // Controls volume slider
    let volumeSlider = document.getElementById("wavesurferVolume")
    volumeSlider.oninput = function() {
        self.wavesurfer.setVolume(volumeSlider.value / 100)
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

#customBackgroundImagePanel {
  position: absolute;
  right: 200px;
  bottom: 200px; 
  color: white; 
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
}

.tableSongs {
  width: 100%;
  text-align: left;
}

.tableSongsTdPlay {
  width: 50px;
}

.tableSongsTdSongName {
  width: 500px; 
}

.tableSongsTdArtistName {
  width: 150px; 
}

.tableSongsTdSongLength {
  width: 50px;
}

#divCenterTableHeader {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px;
  margin-left: 1px; 
  color: white; 
}

.tableSongsHeader {
  /* width: 100%; */
  text-align: left; 
}

.tableSongsHeaderTitle {
  padding-left: 75px;
  width: 500px;
}

.tableSongsHeaderLength {
  width: 50px; 
}

.tableSongsHeaderArtist {
  width: 150px; 
  padding-left: 55px; 
}

#divSongPane {
  background-color: white; 
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  width: 850px;
  margin-top: 15px;
  margin-left: 15px; 
}

#divTopbar {
  position: absolute;
  background-color: white;
  width: 100%;
  height: 35px;
  /* box-shadow: 0 4px 2px -2px gray; */
  z-index: 1;
  padding: 2px;
  text-align: left;
}

#logo {
  position: absolute;
  left: 42.5px;
}

#divSidebarCurrentSongInfo {
  color: white;  
  position: absolute;
  left: 0; 
  bottom: 0; 
  text-align: center;
  width: 100%;
}

#divSidebar {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 170px;
  height: 100%;
  z-index: 0;
  border-right: 1px solid white;
}

#divPlayerControls {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 130px;
  left: 171px;
  bottom: 0;
  z-index: 0;
  display: none; 
}

#h3Library {
  margin-top: 120px;
} 

#songLoader {
  color: white; 
  font-size: 40px;
  margin: auto; 
  margin-top: 45px;
}

#songLoaderProgress {
  position: absolute;
  font-size: 20px;
  padding-left: 15px;
  margin-top: 10px;
}

#btnUploadSong {
  position: absolute;
  bottom: 250px; 
  left: 0;
  background-color: transparent;
  border: none;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  color: grey; 
  width: 170px; 
  padding: 10px; 
  font-family: 'Monsterrat', sans-serif;
  transition: 0.3s;
}

#btnUploadSong:hover {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  color: white; 

}

#divCenter {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 170px;
  bottom: 10%;
  top: 35px;
  z-index: 0;
}

#waveform {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  margin-left: 200px; 
  width: 75%;
  outline: none; 
  /* border: 1px solid green;  */
  cursor: pointer;
}

#controlsWrapper {
  width: 200px;
  height: 130px;
  /* border: 1px solid red;  */
}

#divSongDuration {
  position: absolute;
  text-align: center;
  bottom: 165px;
  left: 42%;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px;
  padding-left: 10px; 
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

#wavesurferVolume {
  display: block; 
  margin: auto;
  margin-top: 15px; 
  left: 55px; 
  top: 100px;
  -webkit-appearance: none;  
  appearance: none;
  background: rgb(92, 91, 91);
  opacity: 0.5; 
  height: 7px;
  border-radius: 3px;
  transition: opacity 0.3s;
  cursor: pointer; 
}

#wavesurferVolume:hover {
  opacity: 1; 
}

#wavesurferVolume::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px; 
  height: 15px;
  background: #ffffff; 
  border-radius: 100%; 
  cursor: pointer;
}

#wavesurferVolume::-moz-range-thumb {
  width: 15px; 
  height: 15px; 
  background: #ffffff; 
  border-radius: 100%;
  cursor: pointer; 
}

#divPlay {
  display: block;
  margin: auto; 
  margin-top: 15px; 
  background-color: white; 
  border-radius: 100%;
  width: 75px;
  height: 75px;
  border: none;
  animation: playerpulse infinite 1.5s; 
  cursor: pointer;
}

#divPause {
  display: block;
  margin: auto; 
  margin-top: 15px; 
  background-color: white; 
  border-radius: 100%;
  width: 75px;
  height: 75px;
  border: none; 
  display: none; 
  cursor: pointer;
}

#btnSignOut {
  position: absolute;
  right: 35px;
  top: 7px; 
  border: none;
  padding: 5px; 
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  transition: 0.3s;
}

#btnSignOut:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #8b0000;
}

#divUser {
  position: absolute;
  right: 165px;
  top: 5px; 
  border: none;
  padding: 5px; 
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

h3 {
  color: white;
  text-decoration: underline;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #202225;
  font-size: 15px;
  font-family: 'Monsterrat', sans-serif;
  display: block;
  color: white;
}

@keyframes playerpulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

</style>