<template>
<div id="divPlayerWrapper">

    <div id="divTopbar">
      <img id="logo" src="/src/assets/fury music logo ferdig.png" height="80px">

    </div>

    <div id="divSidebar">
      <h3>Your library</h3>
      <a>All public songs</a>
      <a>My uploaded songs</a>
      <a>My local songs</a>

      <h3>Playlists</h3>
    </div>

    <div id="divCenter">
      <div v-if="loggedIn">
        <div id="divSongPane" v-for="song in songs" :key="song.SongID">
          <table id="tableSongs">
            <tr>
              <td>
                <font-awesome-icon v-bind:id="'play' + song.SongID" v-on:click="playSong(song.SongURL,song.SongID)" style="color: black" :icon="['fas', 'play']" />
                <font-awesome-icon v-bind:id="'pause' + song.SongID" v-on:click="pauseSong(song.SongID)" style="color: black; display: none" :icon="['fas', 'pause']" />
              </td>
              <td>
                {{song.SongName}}
              </td>
              <td>
                {{song.ArtistName}}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div id="divPlayerControls">


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
    }
  },
  data () {
    return {
      username: "",
      songs: [],
      currentSong: new Audio(),
      currentSongID: "",
      playingSong: false,
      apiURL: "https://furymusic.000webhostapp.com/scripts/"
    }
  },
  props: {
    loggedIn: Boolean
  },
  methods: {
    playSong(SongURL, SongID) {

      // If no song is selected, play selected song
      if(this.currentSongID == "")
      {
        this.currentSongID = SongID
        this.currentSong.src = SongURL
        this.currentSong.play()
        document.getElementById("pause" + SongID).style.display = "block"
        document.getElementById("play" + SongID).style.display = "none"
      }
      // Continues paused song
      else if(this.currentSongID == SongID)
      {
        this.currentSong.play()
        document.getElementById("pause" + SongID).style.display = "block"
        document.getElementById("play" + SongID).style.display = "none"
      }
      // If a song has been selected before, but it's not the same song
      else
      {
        document.getElementById("play" + this.currentSongID).style.display = "block"
        document.getElementById("pause" + this.currentSongID).style.display = "none"
        this.currentSongID = SongID
        this.currentSong.src = SongURL
        this.currentSong.play()
        document.getElementById("play" + SongID).style.display = "none"
        document.getElementById("pause" + SongID).style.display = "block"
      }
    },
    pauseSong(SongID) {
      this.currentSong.pause()
      document.getElementById("play" + SongID).style.display = "block"
      document.getElementById("pause" + SongID).style.display = "none"
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
      var self = this;
      $.ajax(
          {
            type: "POST",
            url: this.apiURL + "getAllSongs.php",
            dataType: "json",
            cache: false,
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
#tableSongs {
  width: 100%;
}
#divSongPane {
  background-color: white; 
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  width: 450px;
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
#divSidebar {
  position: absolute;
  background-color: rgb(53, 50, 50);
  width: 170px;
  height: 100%;
  z-index: 0;
  padding-top: 200px;
}
#divPlayerControls {
  position: absolute;
  background-color: white;
  width: 100%;
  height: 80px;
  left: 170px;
  bottom: 0;
  z-index: 0;
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
</style>