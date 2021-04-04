<template>
  <div id="divPlayerWrapper">
    <div id="divTopbar" class="animate__animated animate__fadeInDown">
      <img
        id="logo"
        :src="logo"
        width="65px"
        v-on:click="showEasteregg()"
        alt="Fury Music logo"
        class="animate__animated animate__pulse animate__infinite animate__slow"
      />
      <div id="divSearchSong">
        <font-awesome-icon style="color: white" :icon="['fas', 'search']" />
        <input
          type="text"
          id="searchSong"
          @change="searchSong()"
          placeholder="Search"
        />
      </div>
      <div id="divUser">
        <font-awesome-icon
          style="color: black"
          :icon="['fas', 'user-circle']"
        />
        {{ $store.state.username }}
      </div>
      <button id="btnSignOut" v-on:click="signOut()">
        <font-awesome-icon
          style="color: white"
          :icon="['fas', 'times-circle']"
        />
        Sign out
      </button>
    </div>

    <div id="divSidebar" class="animate__animated animate__fadeInLeft">
      <h3 id="h3Library">Your library</h3>

      <span class="sidebarLink" v-on:click="resetSearch()"
        >All public songs</span
      >
      <br />
      <span class="sidebarLink" v-on:click="searchSong($store.state.username)"
        >My uploaded songs</span
      >

      <h3>Playlists</h3>

      <button id="btnUploadSong" v-on:click="showUploadSong = true">
        <font-awesome-icon style="color: grey" :icon="['fas', 'plus']" />
        Upload song
      </button>

      <div
        id="divSidebarCurrentSongInfo"
        v-if="currentSongName != ''"
        class="animate__animated animate__fadeInLeft ellipsis"
      >
        <img
          id="SongCoverImage"
          v-bind:src="currentSongImageURL"
          width="90px"
        />
        <p style="font-weight: bold">{{ currentSongName }}</p>
        <p>{{ currentArtistName }}</p>
      </div>
    </div>

    <div id="divCenter">
      <div v-if="loggedIn">
        <div
          id="divCenterTableHeader"
          class="animate__animated animate__fadeInRight"
        >
          <table class="tableSongsHeader">
            <tr>
              <td class="tableSongsHeaderTitle">
                <span>Title</span>
              </td>
              <td class="tableSongsHeaderArtist">
                <span>Artist</span>
              </td>
              <td class="tableSongsHeaderAlbum">
                <span>Album</span>
              </td>
              <td class="tableSongsHeaderLength">
                <span>Length</span>
              </td>
              <td class="tableSongsHeaderPublisher">
                <span>Published by</span>
              </td>
            </tr>
          </table>
        </div>
        <div
          id="divSongPane"
          v-for="song in songs"
          :key="song.SongID"
          v-show="song.Show"
          class="animate__animated animate__fadeInRight"
        >
          <div class="divSongsPlay">
            <font-awesome-icon
              v-bind:id="'play' + song.SongID"
              v-on:click="
                playSong(
                  song.SongURL,
                  song.SongID,
                  song.SongName,
                  song.ArtistName,
                  song.Length,
                  song.Album,
                  song.SongImageURL
                )
              "
              style="color: black; cursor: pointer; filter: drop-shadow(0px 0px 7px #FFFFFF);"
              :icon="['fas', 'play']"
            />
            <font-awesome-icon
              v-bind:id="'pause' + song.SongID"
              v-on:click="pauseSong(song.SongID)"
              style="color: black; cursor: pointer; display: none; filter: drop-shadow(0px 0px 7px #FFFFFF);"
              :icon="['fas', 'pause']"
            />
            <font-awesome-icon
              v-bind:id="'load' + song.SongID"
              style="color: black; display: none; filter: drop-shadow(0px 0px 4px #FFFFFF);"
              :icon="['fas', 'circle-notch']"
              spin
            />
          </div>
          <div class="divSongsSongName ellipsis">
            <span v-bind:title="song.SongName">{{ song.SongName }}</span>
          </div>
          <div class="divSongsArtistName ellipsis">
            <span v-bind:title="song.ArtistName">{{ song.ArtistName }}</span>
          </div>
          <div class="divSongsSongAlbum ellipsis">
            <span v-bind:title="song.Album">{{ song.Album }}</span>
          </div>
          <div class="divSongsSongLength">
            <span v-bind:title="song.Length">{{ song.Length }}</span>
          </div>
          <div class="divSongsPublisher ellipsis">
            <span v-bind:title="song.Publisher">{{ song.Publisher }}</span>
          </div>
            <font-awesome-icon
              id="fontDownloadSong"
              style="color: lightgrey; transition: 0.3s; cursor: pointer; padding-left: 50px;"
              :icon="['fas', 'cloud-download-alt']"
              title="Download"
              v-on:click="downloadSong(song.SongURL)"
            />
            <font-awesome-icon
              v-if="$store.state.username == song.Publisher"
              id="fontDeleteSong"
              style="color: lightgrey; transition: 0.3s; cursor: pointer; padding-left: 10px;"
              style:hover="color: red;"
              :icon="['fas', 'trash-alt']"
              title="Delete"
              v-on:click="deleteSong(song.SongID, song.SongURL)"
            />
        </div>
      </div>

      <div
        id="customBackgroundImagePanel"
        @mouseover="uploadImgLabel = true"
        @mouseleave="uploadImgLabel = false"
        v-on:click="showCustomBackImg = true"
      >
        <span
          v-show="uploadImgLabel"
          class="animate__animated animate__bounceIn"
          >Change background image</span
        >
        <font-awesome-icon :icon="['fas', 'image']" />
      </div>
    </div>

    <div id="divPlayerControls" class="animate__animated animate__fadeInUp">
      <div id="controlsWrapper">
        <div id="divPlay" v-on:click="wavePlayPauseToggle('play')">
          <font-awesome-icon
            id="playButton"
            style="
              font-size: 35px;
              color: white;
              margin-top: 27%;
              margin-left: 12%;
            "
            :icon="['fas', 'play']"
          />
        </div>
        <div id="divPause" v-on:click="wavePlayPauseToggle('pause')">
          <font-awesome-icon
            id="pauseButton"
            style="
              font-size: 35px;
              color: white;
              margin-top: 27%;
              margin-left: 2%;
            "
            :icon="['fas', 'pause']"
          />
        </div>
        <font-awesome-icon
          id="volumeUp"
          v-on:click="muteUnmute('mute')"
          style="position: absolute; bottom: 15px; left: 25px; color: white; font-size: 17px; cursor: pointer;"
          :icon="['fas', 'volume-up']"
        />
        <font-awesome-icon
          id="volumeMute"
          v-on:click="muteUnmute('unmute')"
          style="position: absolute; bottom: 15px; left: 25px; color: white; font-size: 17px; display: none; cursor: pointer;"
          :icon="['fas', 'volume-mute']"
        />
        <input
          type="range"
          min="0"
          max="100"
          value="100"
          id="wavesurferVolume"
        />
      </div>
      <span id="spanElapsedPlaytime">{{ elapsedPlaytime }}</span>
      <div id="waveform" v-on:click="waveformInteraction()"></div>
      <span id="spanTotalPlaytime">{{ currentSongLength }}</span>
    </div>

    <div id="songLoader">
      <font-awesome-icon :icon="['fas', 'circle-notch']" spin />
      <span id="songLoaderProgress"></span>
    </div>

    <div
      id="divPlayerMinimize"
      v-on:click="minimizeMaximizePlayer()"
      class="animate__animated animate__flipInY"
    >
      <span id="spanPlayerMinimize">Minimize</span>
      <font-awesome-icon id="fontPlayerMinimize" :icon="['fas', 'sort-down']" />
      <font-awesome-icon
        id="fontPlayerMaximize"
        :icon="['fas', 'sort-up']"
        style="display: none;"
      />
    </div>

    <div id="divPlayerOptions" class="animate__animated animate__flipInY">
      <font-awesome-icon id="fontToggleShuffle"
      style="opacity: 1;"
      title="Toggle shuffle"
      v-on:click="toggleShufflePlay()" :icon="['fas', 'random']" />
    </div>

    <UploadBackImg
      v-show="showCustomBackImg"
      @hideCustomBackgroundImageComponent="showCustomBackImg = false"
    />

    <UploadSong
      v-show="showUploadSong"
      @hideUploadSongComponent="showUploadSong = false"
    />
  </div>
</template>

<script>
import UploadBackImg from "./UploadBackImg.vue";
import UploadSong from "./UploadSong.vue";

export default {
  name: "Player",
  components: {
    UploadBackImg,
    UploadSong
  },
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      wavesurfer: null,
      songs: [],
      currentSongID: "",
      currentSongName: "",
      currentArtistName: "",
      currentSongAlbum: "",
      currentSongLength: 0,
      currentSongImageURL: "",
      elapsedPlaytime: 0,
      showCustomBackImg: false,
      uploadImgLabel: false,
      showUploadSong: false,
      oldVol: 0,
      toggleShuffle: true,
      logo: "src/assets/fury logo favicon5.png",
      logoImage: "src/assets/fury logo favicon5.png",
      easterImage: "src/assets/east long.gif",
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    };
  },
  props: {
    loggedIn: Boolean
  },
  methods: {
    wavePlayPauseToggle(mode) {
      if (mode == "play") {
        this.wavesurfer.play();
        document.title =
          "Playing '" + this.currentSongName + "' by " + this.currentArtistName;
        document.getElementById("divPlay").style.display = "none";
        document.getElementById("divPause").style.display = "block";
        document.getElementById("play" + this.currentSongID).style.display =
          "none";
        document.getElementById("pause" + this.currentSongID).style.display =
          "block";
      } else {
        this.wavesurfer.pause();
        document.title = "Paused";
        document.getElementById("divPause").style.display = "none";
        document.getElementById("divPlay").style.display = "block";
        
          document.getElementById("pause" + this.currentSongID).style.display =
            "none";
          document.getElementById("play" + this.currentSongID).style.display =
            "block";
        
      }
    },
    playSong(
      SongURL,
      SongID,
      SongName,
      ArtistName,
      Length,
      Album,
      SongImageURL
    ) {
      document.getElementById("divPlayerControls").style.display = "block";
      document.getElementById("divPlayerMinimize").style.bottom = "130px";
      document.getElementById("divPlayerOptions").style.bottom = "130px";
      document.getElementById("spanPlayerMinimize").innerHTML = "Minimize";
      document.getElementById("fontPlayerMinimize").style.display =
        "inline-block";
      document.getElementById("fontPlayerMaximize").style.display = "none";

      setTimeout(function() {
        document.getElementById("divPlayerMinimize").style.display = "block";
        document.getElementById("divPlayerOptions").style.display = "block";
      }, 1000);

      // If no song is selected, load selected song
      if (this.currentSongID == "") {
        this.currentSongName = SongName;
        this.currentArtistName = ArtistName;
        this.currentSongID = SongID;
        this.currentSongAlbum = Album;
        this.currentSongLength = Length;
        this.currentSongImageURL = SongImageURL;
        this.wavesurfer.load(SongURL);
        document.getElementById(
          "play" + SongID
        ).parentElement.parentElement.style.backgroundColor =
          "rgba(0, 0, 0, 0.7)";
        document.getElementById(
          "play" + SongID
        ).parentElement.parentElement.style.color = "white";
        document.getElementById("play" + SongID).style.display = "none";
        document.getElementById("load" + SongID).style.display = "block";
      }
      // Continues paused/plays loaded song
      else if (this.currentSongID == SongID) {
        this.wavesurfer.play();
        document.title =
          "Playing '" + this.currentSongName + "' by " + this.currentArtistName;
        document.getElementById("pause" + SongID).style.display = "block";
        document.getElementById("play" + SongID).style.display = "none";
        document.getElementById("divPlay").style.display = "none";
        document.getElementById("divPause").style.display = "block";
      }
      // If a song has been selected before, but it's not the same song
      else {
        document.title = "Fury Music";
        document.getElementById("play" + this.currentSongID).style.display =
          "block";
        document.getElementById("pause" + this.currentSongID).style.display =
          "none";
        document.getElementById("load" + this.currentSongID).style.display =
          "none";
        document.getElementById("divPlay").style.display = "block";
        document.getElementById("divPause").style.display = "none";
        document.getElementById(
          "play" + this.currentSongID
        ).parentElement.parentElement.style.backgroundColor = "white";
        document.getElementById(
          "play" + this.currentSongID
        ).parentElement.parentElement.style.color = "black";
        this.currentSongID = SongID;
        this.currentSongName = SongName;
        this.currentArtistName = ArtistName;
        this.currentSongAlbum = Album;
        this.currentSongLength = Length;
        this.currentSongImageURL = SongImageURL;
        this.wavesurfer.load(SongURL);
        document.getElementById(
          "play" + SongID
        ).parentElement.parentElement.style.backgroundColor =
          "rgba(0, 0, 0, 0.7)";
        document.getElementById(
          "play" + SongID
        ).parentElement.parentElement.style.color = "white";
        document.getElementById("load" + SongID).style.display = "block";
        document.getElementById("play" + SongID).style.display = "none";
      }
    },
    pauseSong(SongID) {
      this.wavesurfer.pause();
      document.getElementById("play" + SongID).style.display = "block";
      document.getElementById("pause" + SongID).style.display = "none";
      document.getElementById("divPlay").style.display = "block";
      document.getElementById("divPause").style.display = "none";
      document.title = "Paused";
    },
    populateSongList(songs) {
      for (var i = 0; i < songs.length; i += 8) {
        let minutes = parseInt(songs[i + 4] / 60);
        let seconds = parseInt(songs[i + 4] - minutes * 60);

        if (seconds < 10) seconds = "0" + seconds;

        this.songs.push({
          SongID: songs[i],
          ArtistName: songs[i + 1],
          SongName: songs[i + 2],
          SongURL: songs[i + 3],
          Album: songs[i + 5],
          Length: minutes + ":" + seconds,
          Publisher: songs[i + 6],
          SongImageURL: songs[i + 7],
          Show: true
        });
      }
      this.searchSongsCopy = this.songs;
    },
    waveformInteraction() {
      let self = this;
      if (this.wavesurfer.isPlaying()) {
        setTimeout(function() {
          self.wavesurfer.play();
        }, 1);
      }
    },
    resetSearch() {
      document.getElementById("searchSong").value = "";
      for (let i = 0; i < this.songs.length; i++) {
        this.songs[i].Show = true;
      }
    },
    searchSong(value) {
      let searchQuery = "";
      // Determines wether to search using query from search field or parameter/find user's self uploaded songs
      if (value == undefined) {
        searchQuery = document.getElementById("searchSong").value.toLowerCase();
      } else {
        searchQuery = value;

        for (let i = 0; i < this.songs.length; i++) {
          let string = this.songs[i].Publisher.toLowerCase();
          if (string.includes(searchQuery)) {
            this.songs[i].Show = true;
          } else {
            this.songs[i].Show = false;
          }
        }
        document.getElementById("divPlayerControls").style.display = "none";
        document.getElementById("divPlayerMinimize").style.display = "none";
        document.getElementById("divPlay").style.display = "block";
        document.getElementById("divPause").style.display = "none";
        return;
      }

      this.resetSearch();

      // Loops through songs and filters out any entries who doesn't fit search query
      for (let i = 0; i < this.songs.length; i++) {
        let string = this.songs[i].SongName.toLowerCase();
        let hit = 0;
        if (string.includes(searchQuery)) {
          hit++;
        }

        string = this.songs[i].Album.toLowerCase();
        if (string.includes(searchQuery)) {
          hit++;
        }

        string = this.songs[i].ArtistName.toLowerCase();
        if (string.includes(searchQuery)) {
          hit++;
        }

        string = this.songs[i].Publisher.toLowerCase();
        if (string.includes(searchQuery)) {
          hit++;
        }
        if (hit < 1) {
          this.songs[i].Show = false;
        }
      }
    },
    toggleShufflePlay() {
      let btn = document.getElementById("fontToggleShuffle"); 
      if(btn.style.opacity == "0.25") {
        this.toggleShuffle = true; 
        document.getElementById("fontToggleShuffle").style.opacity = "1";
        return; 
      }
      btn.style.opacity = "0.25";
      this.toggleShuffle = false;
    },
    downloadSong(songURL) {
      window.open(songURL, "_blank");
    },
    deleteSong(songid, songurl) {
      // FIXES MER HER MED SONGID PÅ SERVER OSV.
      let self = this;
      Ozone.fire(
        "info",
        "Delete song?",
        "center",
        "dialog",
        "Delete",
        "Cancel",
        function() {
          let fd = new FormData();
          fd.append("username", self.$store.state.username);
          fd.append("songURL", songurl);

          fetch(self.apiURL + "deleteSong.php", {
            method: "post",
            body: fd
          })
            .then(function(response) {
              return response.text().then(function(text) {
                if (text == "OK") {
                  self.songs.splice(self.songs.indexOf(songurl), 1);
                  Ozone.fire(
                    "success",
                    "Song has been deleted",
                    "bottom-middle"
                  );
                } else {
                  Ozone.fire("error", "Something went wrong", "bottom-middle");
                }
              });
            })
            .catch(function(error) {
              console.error("Error:", error);
            });
        }
      );
    },
    playRandom() {
      console.log("Playing random song...");
      let next = this.songs[Math.floor(Math.random() * this.songs.length)];
      this.playSong(next.SongURL, next.SongID, next.SongName, next.ArtistName, next.Length, next.Album, next.SongImageURL); 
    },
    muteUnmute(mode) {
      if (mode == "mute") {
        document.getElementById("volumeMute").style.display = "block";
        document.getElementById("volumeUp").style.display = "none";
        this.oldVol = document.getElementById("wavesurferVolume").value;
        document.getElementById("wavesurferVolume").value = 0;
        this.wavesurfer.setVolume(0);
      } else {
        document.getElementById("volumeMute").style.display = "none";
        document.getElementById("volumeUp").style.display = "block";
        document.getElementById("wavesurferVolume");
        document.getElementById("wavesurferVolume").value = this.oldVol;
        this.wavesurfer.setVolume((this.oldVol * this.oldVol) / 10000);
      }
    },
    minimizeMaximizePlayer() {
      if (
        document.getElementById("divPlayerControls").style.display == "block"
      ) {
        document.getElementById("divPlayerControls").style.display = "none";
        document.getElementById("divPlayerMinimize").style.bottom = "0";
        document.getElementById("spanPlayerMinimize").innerHTML = "Maximize";
        document.getElementById("fontPlayerMaximize").style.display =
          "inline-block";
        document.getElementById("fontPlayerMinimize").style.display = "none";
      } else {
        document.getElementById("divPlayerMinimize").style.bottom = "130px";
        document.getElementById("divPlayerControls").style.display = "block";
        document.getElementById("spanPlayerMinimize").innerHTML = "Minimize";
        document.getElementById("fontPlayerMinimize").style.display =
          "inline-block";
        document.getElementById("fontPlayerMaximize").style.display = "none";
      }
    },
    showEasteregg() {
      let self = this;
      this.logo = this.easterImage;
      let dask = new Audio("src/assets/easteregg.mp3");
      setTimeout(function() {
        dask.play();
      }, 400);
      setTimeout(function() {
        self.logo = self.logoImage;
      }, 1900);
    },
    signOut() {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      window.location.replace(location + "?signedout=true");
    }
  },
  watch: {
    loggedIn: function() {
      console.log("Fetching all songs...");
      var self = this;
      fetch(self.apiURL + "getAllSongs.php", {
        method: "post"
      })
        .then(function(response) {
          return response.json().then(function(text) {
            if (text != "Error") {
              self.populateSongList(text);
            } else {
              console.log("ERROR: " + text);
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    let self = this;

    // Initializes the WaveSurfer object
    this.wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "white",
      progressColor: "black",
      barWidth: 2,
      height: 100,
      normalize: false,
      fillParent: true,
      responsive: true
    });

    // Event for when song finishes
    this.wavesurfer.on("finish", function() {
      document.title = "Fury Music";
      self.elapsedPlaytime = self.currentSongLength;
      document.getElementById("play" + self.currentSongID).style.display =
        "block";
      document.getElementById("pause" + self.currentSongID).style.display =
        "none";
      document.getElementById("divPlay").style.display = "block";
      document.getElementById("divPause").style.display = "none";

      if(self.toggleShuffle) {
        setTimeout(function() {
          self.playRandom(); 
        }, 3000); 
      }

    });

    this.wavesurfer.on("audioprocess", function(progress) {
      let minutes = parseInt(progress / 60);
      let seconds = parseInt(progress - minutes * 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      self.elapsedPlaytime = minutes + ":" + seconds;
    });

    // Fires when a song is loading
    this.wavesurfer.on("loading", function(progress) {
      document.title = "Fury Music";
      self.elapsedPlaytime = "0:00";
      document.getElementById("play" + self.currentSongID).style.display =
        "none";
      document.getElementById("divPlay").style.opacity = "0.25";
      document.getElementById("divPlay").style.pointerEvents = "none";
      document.getElementById("wavesurferVolume").style.opacity = "0.25";
      document.getElementById("wavesurferVolume").style.pointerEvents = "none";
      document.getElementById("volumeMute").style.opacity = "0.25";
      document.getElementById("volumeMute").style.pointerEvents = "none";
      document.getElementById("volumeUp").style.opacity = "0.25";
      document.getElementById("volumeUp").style.pointerEvents = "none";
      document.getElementById("load" + self.currentSongID).style.display =
        "block";
      document.getElementById("songLoader").style.display = "block";
      document.getElementById("songLoaderProgress").innerHTML = progress + "%";

      if (localStorage.getItem("volumeLog")) {
        self.wavesurfer.setVolume(localStorage.getItem("volumeLog"));
      }
    });

    // Fires when wavesurfer is ready
    this.wavesurfer.on("ready", function() {
      document.getElementById("songLoader").style.display = "none";
      document.getElementById("divPlay").style.opacity = "1";
      document.getElementById("divPlay").style.pointerEvents = "auto";
      document.getElementById("wavesurferVolume").style.opacity = "1";
      document.getElementById("wavesurferVolume").style.pointerEvents = "auto";
      document.getElementById("volumeMute").style.opacity = "1";
      document.getElementById("volumeMute").style.pointerEvents = "auto";
      document.getElementById("volumeUp").style.opacity = "1";
      document.getElementById("volumeUp").style.pointerEvents = "auto";
      document.getElementById("play" + self.currentSongID).style.display =
        "block";
      document.getElementById("load" + self.currentSongID).style.display =
        "none";
      self.elapsedPlaytime = "0:00";
      if(self.toggleShuffle) {
        self.wavePlayPauseToggle("play"); 
      }
    });

    // Controls volume slider and saving of value
    let volumeSlider = document.getElementById("wavesurferVolume");
    if (localStorage.getItem("volume")) {
      volumeSlider.value = localStorage.getItem("volume");
    }
    volumeSlider.oninput = function() {
      let vol = (volumeSlider.value * volumeSlider.value) / 10000;
      self.wavesurfer.setVolume(vol);
      localStorage.setItem("volume", volumeSlider.value);
      localStorage.setItem("volumeLog", vol);

      if (volumeSlider.value == 0) {
        document.getElementById("volumeMute").style.display = "block";
        document.getElementById("volumeUp").style.display = "none";
      } else {
        document.getElementById("volumeMute").style.display = "none";
        document.getElementById("volumeUp").style.display = "block";
      }
    };
  }
};
</script>

<style scoped>
#customBackgroundImagePanel {
  position: fixed;
  right: 15px;
  bottom: 150px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
}

#divPlayerOptions {
  display: none;
  position: absolute;
  text-align: center;
  bottom: 130px;
  left: 171px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-right-radius: 5px;
  cursor: pointer;
}

#divSearchSong {
  position: absolute;
  right: 285px;
  top: 6px;
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 100px;
  padding-left: 10px;
  padding-right: 10px;
}

#searchSong {
  border: none;
  color: white;
  background-color: transparent;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 4px; */
  height: 25px;
}

#searchSong::placeholder {
  color: white;
}

#spanTotalPlaytime {
  position: absolute;
  color: white;
  right: 55px;
  bottom: 55px;
}

#spanElapsedPlaytime {
  position: absolute;
  color: white;
  left: 210px;
  bottom: 55px;
}

.divSongsPlay {
  flex: 0 0 45px;
}

.divSongsSongName {
  flex: 0 0 335px;
  padding-right: 50px;
}

.divSongsArtistName {
  flex: 0 0 250px;
  padding-right: 50px;
}

.divSongsSongLength {
  flex: 0 0 125px;
}

.divSongsPublisher {
  flex: 0 0 175px;
  padding-left: 55px;
}

.divSongsSongAlbum {
  flex: 0 0 190px;
  padding-right: 50px;
}

#divCenterTableHeader {
  position: fixed;
  top: 39px;
  left: 170px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 7px;
  margin-left: 1px;
  color: white;
  white-space: nowrap;
}

.tableSongsHeader {
  text-align: left;
}

.tableSongsHeaderTitle {
  padding-left: 60px;
}

.tableSongsHeaderLength {
  padding-left: 190px;
}

.tableSongsHeaderPublisher {
  padding-left: 130px;
}

.tableSongsHeaderArtist {
  padding-left: 350px;
}

.tableSongsHeaderAlbum {
  padding-left: 260px;
}

#divSongPane {
  display: flex;
  text-align: left;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  padding: 10px;
  width: 1435px;
  margin-top: 15px;
  margin-left: 15px;
  transition: 0.2s;
}

#divSongPane:hover {
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
}

font-awesome-icon {
  background-color: transparent !important;
}

.divSongPaneHover:hover {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#divTopbar {
  position: absolute;
  background-color: white;
  height: 35px;
  left: 0;
  right: 0;
  /* box-shadow: 0 4px 2px -2px gray; */
  z-index: 1;
  padding: 2px;
  text-align: left;
}

#logo {
  position: absolute;
  /* border-radius: 100%;  */
  left: 50px;
  top: 5px;
}

#divSidebarCurrentSongInfo {
  color: white;
  position: absolute;
  left: 5%;
  bottom: 0;
  text-align: center;
  width: 90%;
}

#divSidebar {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 170px;
  top: 39px;
  bottom: 0;
  z-index: 0;
  border-right: 1px solid white;
}

#divPlayerControls {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  height: 130px;
  margin-left: 171px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: none;
}

#h3Library {
  margin-top: 120px;
}

#songLoader {
  display: none;
  position: absolute;
  color: white;
  font-size: 40px;
  bottom: 40px;
  margin-left: 48.5%;
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
  font-family: "Monsterrat", sans-serif;
  transition: 0.3s;
}

#btnUploadSong:hover {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  color: white;
}

#divCenter {
  position: absolute;
  left: 170px;
  right: 0px;
  bottom: 190px;
  top: 78px;
  z-index: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

#waveform {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100px;
  left: 0;
  padding-bottom: 15px;
  padding-top: 15px;
  margin-left: 260px;
  outline: none;
  cursor: pointer;
}

#controlsWrapper {
  width: 200px;
  /* border: 1px solid red;  */
}

#divPlayerMinimize {
  display: none;
  position: absolute;
  text-align: center;
  bottom: 130px;
  left: 48%;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
}

#wavesurferVolume {
  position: absolute;
  bottom: 15px;
  width: 110px;
  margin: auto;
  left: 60px;
  top: 97px;
  -webkit-appearance: none;
  appearance: none;
  background: rgb(92, 91, 91);
  height: 5px;
  border-radius: 3px;
  cursor: pointer;
}

#wavesurferVolume::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
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

.sidebarLink {
  display: block;
  color: white;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s;
}

.sidebarLink:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

#SongCoverImage {
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}

#fontDownloadSong:hover {
  color: rgb(71, 158, 187) !important;
}

#fontDeleteSong:hover {
  color: #8b0000 !important;
}

#divPlay {
  display: block;
  margin: auto;
  margin-top: 15px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 100%;
  width: 75px;
  height: 75px;
  border: none;
  cursor: pointer;
}

#divPause {
  display: block;
  margin: auto;
  margin-top: 15px;
  background-color: rgba(255, 255, 255, 0.15);
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

#divPlayerWrapper {
  width: 100%;
  height: 100%;
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
  font-family: "Monsterrat", sans-serif;
  display: block;
  color: white;
}
</style>
