<template>
<div id="divPlayerWrapper">

    <div id="divTopbar" class="animate__animated animate__fadeInDown">
      <img id="logo" src="/src/assets/fury music logo ferdig.png" width="80px">
      <div id="divUser">
        <font-awesome-icon style="color: black" :icon="['fas', 'user-circle']" />
        {{username}}
      </div>
      <button id="btnSignOut">
        <font-awesome-icon style="color: white" :icon="['fas', 'times-circle']" />
        Sign out
        </button>
    </div>

    <div id="divSidebar" class="animate__animated animate__fadeInLeft">
      <h3 id="h3Library">Your library</h3>
      <a>All public songs</a>
      <a>My uploaded songs</a>

      <h3>Playlists</h3>
      
      <div id="divSidebarCurrentSongInfo" v-if="currentSongName != ''" class="animate__animated animate__fadeInLeft">
        <p style="font-weight: bold">{{currentSongName}}</p>
        <p>{{currentArtistName}}</p>
      </div>
    </div>

    <div id="divCenter">
      <div v-if="loggedIn">
        <div id="divSongPane" v-for="song in songs" :key="song.SongID" class="animate__animated animate__fadeInRight">
          <table  id="tableSongs">
            <tr>
              <td id="tableSongsTdPlay">
                <font-awesome-icon v-bind:id="'play' + song.SongID" v-on:click="playSong(song.SongURL, song.SongID, song.SongName, song.ArtistName)" style="color: black; cursor: pointer;" :icon="['fas', 'play']" />
                <font-awesome-icon v-bind:id="'pause' + song.SongID" v-on:click="pauseSong(song.SongID)" style="color: black; cursor: pointer; display: none" :icon="['fas', 'pause']" />
              </td>
              <td id="tableSongsTdSongName">
                {{song.SongName}}
              </td>
              <td id="tableSongsTdArtistName">
                {{song.ArtistName}}
              </td>
               <td id="tableSongsTdSongLength"> <!-- TODO: add song length -->
                {{song.Length}}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div id="divPlayerControls" class="animate__animated animate__fadeInUp">
      <div id="divPlay" v-on:click="wavePlayPauseToggle('play')">
        <font-awesome-icon id="playButton" style="font-size: 35px; color: black; margin-top: 27%; margin-left: 12%" :icon="['fas', 'play']" />
      </div>
       <div id="divPause" v-on:click="wavePlayPauseToggle('pause')">
        <font-awesome-icon id="pauseButton" style="font-size: 35px; color: black; margin-top: 27%; margin-left: 2%;" :icon="['fas', 'pause']" />
      </div>
        <div id="waveform"></div>
    </div>

</div>
</template>

<script>

export default {
  name: 'player',
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: ""
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
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    }
  },
  props: {
    loggedIn: Boolean,
    username: String
  },
  methods: {
    wavePlayPauseToggle (mode) {
      this.wavesurfer.playPause()
      if(mode == "play")
      {
        document.getElementById("divPlay").style.display = "none"
        document.getElementById("divPause").style.display = "block"
        document.getElementById("play" + this.currentSongID).style.display = "none"
        document.getElementById("pause" + this.currentSongID).style.display = "block"
      }
      else
      {
        document.getElementById("divPause").style.display = "none";
        document.getElementById("divPlay").style.display = "block"
        document.getElementById("pause" + this.currentSongID).style.display = "none"
        document.getElementById("play" + this.currentSongID).style.display = "block"
      }
    },
    playSong (SongURL, SongID, SongName, ArtistName) {
      
      document.getElementById("divPlayerControls").style.display = "block"
      
      // If no song is selected, play selected song
      if(this.currentSongID == "")
      {
        this.currentSongName = SongName
        this.currentArtistName = ArtistName
        this.currentSongID = SongID
        
        this.wavesurfer.load(SongURL) 
      }
      // Continues paused song
      else if(this.currentSongID == SongID)
      {
        this.wavesurfer.playPause()
        document.getElementById("pause" + SongID).style.display = "block"
        document.getElementById("play" + SongID).style.display = "none"
        document.getElementById("divPlay").style.display = "none"
        document.getElementById("divPause").style.display = "block"
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
      for(var i = 0; i < songs.length; i+=4) 
      {
          this.songs.push({SongID: songs[i], ArtistName: songs[i+1], SongName: songs[i+2]
            , SongURL: songs[i+3]})
      } 
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
                if(data != "Error occurred when fetching all songs")
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
            fillParent: true
          })
          
    // Prepares event for when song finishes
    this.wavesurfer.on('finish', function () {
          document.getElementById("play" + self.currentSongID).style.display = "block"
          document.getElementById("pause" + self.currentSongID).style.display = "none"
          document.getElementById("divPlay").style.display = "block"
          document.getElementById("divPause").style.display = "none"
        })
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

#tableSongs {
  width: 100%;
  text-align: left;
}

#tableSongsTdPlay {
  width: 50px;
}

#tableSongsTdSongName {
  width: 500px; 
}

#tableSongsTdArtistName {
  width: 150px; 
}

#tableSongsTdSongLength {
  width: 50px;
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
  /* background-color: rgb(53, 50, 50); */
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
  
  position: inline-block;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  /* margin-right: 17%; */
  width: 75%;
  outline: none; 
}

#divPlay {
  position: absolute;
  left: 4%;
  top: 22%;
  background-color: white; 
  border-radius: 100%;
  width: 75px;
  height: 75px;
  border: none;
  animation: playerpulse infinite 1.5s; 
  cursor: pointer;
}

#divPause {
  position: absolute;
  left: 4%;
  top: 22%;
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