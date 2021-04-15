<template>
  <div id="divPlayerWrapper">
    <div id="divTopbar" class="animate__animated animate__fadeInDown">
      <div id="divTopItems">
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
    </div>

    <div id="divSidebar" class="animate__animated animate__fadeInLeft">
      <img
        id="logo"
        src="src/assets/fury logo favicon5.png"
        width="65px"
        title="Fury Music"
        alt="Fury Music logo"
        class="animate__animated animate__pulse animate__infinite animate__slow"
      />
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
        v-if="currentSong.SongName != ''"
        class="animate__animated animate__fadeInLeft ellipsis"
      >
        <img
          id="SongCoverImage"
          v-bind:src="currentSong.SongImageURL"
          width="95px"
        />
        <p style="font-weight: bold">{{ currentSong.SongName }}</p>
        <p>{{ currentSong.ArtistName }}</p>
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
                  song
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
            <span class="songPaneItem" v-bind:title="song.ArtistName" v-on:click="searchSong(song.ArtistName)">{{ song.ArtistName }}</span>
          </div>
          <div class="divSongsSongAlbum ellipsis">
            <span class="songPaneItem" v-bind:title="song.Album" v-on:click="searchSong(song.Album)">{{ song.Album }}</span>
          </div>
          <div class="divSongsSongLength">
            <span v-bind:title="song.Length">{{ song.Length }}</span>
          </div>
          <div class="divSongsPublisher ellipsis">
            <span class="songPaneItem" v-bind:title="song.Publisher" v-on:click="searchSong(song.Publisher)">{{ song.Publisher }}</span>
          </div>
          <font-awesome-icon
            id="fontDownloadSong"
            style="color: lightgrey; transition: 0.3s; cursor: pointer; padding-left: 30px;"
            :icon="['fas', 'cloud-download-alt']"
            title="Download"
            v-on:click="downloadSong(song.SongURL)"
          />
          <font-awesome-icon
              id="fontShareSong"
              style="color: lightgrey; transition: 0.3s; cursor: pointer; padding-left: 10px;"
              :icon="['fas', 'share-alt']"
              title="Copy song link"
              v-on:click="copySongLink(song.SongID)"
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
          id="stepForward"
          title="Skip"
          v-on:click="playNext()"
          style="position: absolute; bottom: 55px; left: 153px; color: white; font-size: 17px; cursor: pointer;"
          :icon="['fas', 'step-forward']"
        />
        <font-awesome-icon
          id="stepBackwards"
          title="Step backwards"
          v-on:click="playPrevious()"
          style="position: absolute; bottom: 55px; left: 30px; color: white; font-size: 17px; cursor: pointer;"
          :icon="['fas', 'step-backward']"
        />
        <font-awesome-icon
          id="volumeUp"
          title="Mute"
          v-on:click="muteUnmute('mute')"
          style="position: absolute; bottom: 15px; left: 30px; color: white; font-size: 17px; cursor: pointer;"
          :icon="['fas', 'volume-up']"
        />
        <font-awesome-icon
          id="volumeMute"
          title="Unmute"
          v-on:click="muteUnmute('unmute')"
          style="position: absolute; bottom: 15px; left: 25px; color: white; font-size: 17px; display: none; cursor: pointer;"
          :icon="['fas', 'volume-mute']"
        />
        <input
          title="Change volume"
          type="range"
          min="0"
          max="100"
          value="100"
          id="wavesurferVolume"
        />
      </div>
      <span id="spanElapsedPlaytime">{{ elapsedPlaytime }}</span>
      <div id="waveform" v-on:click="waveformInteraction()"></div>
      <span id="spanTotalPlaytime">{{ currentSong.Length }}</span>
    </div>

    <div id="songLoader">
      <font-awesome-icon :icon="['fas', 'circle-notch']" spin />
      <span id="songLoaderProgress"></span>
    </div>

    <div
      id="divPlayerMinimize"
      v-on:click="minimizeMaximizePlayer('min')"
      class="animate__animated animate__flipInY"
    >
      <span id="spanPlayerMinimize">Minimize</span>
      <font-awesome-icon id="fontPlayerMinimize" :icon="['fas', 'sort-down']" />
      
    </div>

    <div
      id="divPlayerMaximize"
      v-on:click="minimizeMaximizePlayer('max')"
      class="animate__animated animate__flipInY"
    >
    <span id="spanPlayerMaximize">Maximize</span>
    <font-awesome-icon
        id="fontPlayerMaximize"
        :icon="['fas', 'sort-up']"
      />
    </div>

    <div id="divPlayerOptions" class="animate__animated animate__flipInY">
      <font-awesome-icon
        id="fontToggleShuffle"
        style="opacity: 0.25;"
        title="Toggle shuffle"
        v-on:click="toggleShufflePlay()"
        :icon="['fas', 'random']"
      />
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
      currentSong: {SongID: "", SongURL: "", SongName: "", ArtistName: "", Length: 0, Album: "", SongImageURL: ""}, 
      songHistory: [],
      historyIndex: 0,
      elapsedPlaytime: 0,
      showCustomBackImg: false,
      uploadImgLabel: false,
      showUploadSong: false,
      loading: false,
      oldVol: 0,
      toggleShuffle: false,
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    };
  },
  props: {
    loggedIn: Boolean
  },
  methods: {
    playNext() {
      let index;
      let nextSong;
      if (!this.toggleShuffle) {
        for (let i = 0; i < this.songs.length; i++) {
          if (this.songs[i].SongID == this.currentSong.SongID) {
            index = i + 1;
          }
        }
        if (index == this.songs.length) {
          index = 0;
        }
        nextSong = this.songs[index];

        this.playSong(nextSong);
      } else {
        this.playRandom();
      }
    },
    playPrevious() {
      if (this.historyIndex != 1) {
        this.songHistory.pop();
        this.historyIndex--;
        let prevSong = this.songHistory[this.historyIndex - 1];
        this.playSong(prevSong);
        this.historyIndex--;
        this.songHistory.pop();
      }
    },
    wavePlayPauseToggle(mode) {
      if (mode == "play") {
        this.wavesurfer.play();
        document.title =
          "Playing '" + this.currentSong.SongName + "' by " + this.currentSong.ArtistName;
        document.getElementById("divPlay").style.display = "none";
        document.getElementById("divPause").style.display = "block";
        document.getElementById("play" + this.currentSong.SongID).style.display =
          "none";
        document.getElementById("pause" + this.currentSong.SongID).style.display =
          "block";
      } else {
        this.wavesurfer.pause();
        document.title = "Paused";
        document.getElementById("divPause").style.display = "none";
        document.getElementById("divPlay").style.display = "block";

        document.getElementById("pause" + this.currentSong.SongID).style.display =
          "none";
        document.getElementById("play" + this.currentSong.SongID).style.display =
          "block";
      }
    },
    setMediaMetaData(song) {
      let self = this; 
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song.SongName,
          artist: song.ArtistName,
          album: song.Album,
          // artwork: {src: song.SongImageURL, type: 'image'} TO DO: FIX THIS SO IT WORKS!
        });

        navigator.mediaSession.setActionHandler('play', function() {
          self.wavePlayPauseToggle("play"); 
        });
        navigator.mediaSession.setActionHandler('pause', function() {
          self.wavePlayPauseToggle(); 
        });
        navigator.mediaSession.setActionHandler('previoustrack', function() {
          self.playPrevious(); 
        });
        navigator.mediaSession.setActionHandler('nexttrack', function() {
          self.playNext();
        });

        // navigator.mediaSession.setActionHandler('seekbackward', function() {});
        // navigator.mediaSession.setActionHandler('seekforward', function() {});
      }
    },
    playSong(song) {
      if (this.loading) return; // If something is already loading, don't do anything

      this.minimizeMaximizePlayer("max");

      // If no song is selected, load selected song
      if (this.currentSong.SongID == "") {
        this.setMediaMetaData(song); 
        this.songHistory.push(song);
        this.historyIndex++;
        this.currentSong = song; 
        this.wavesurfer.load(song.SongURL);
        document.getElementById(
          "play" + song.SongID
        ).parentElement.parentElement.style.backgroundColor =
          "rgba(0, 0, 0, 0.7)";
        document.getElementById(
          "play" + song.SongID
        ).parentElement.parentElement.style.color = "white";
        document.getElementById("play" + song.SongID).style.display = "none";
        document.getElementById("load" + song.SongID).style.display = "block";
      }
      // Continues paused/plays loaded song
      else if (this.currentSong.SongID == song.SongID) {
        this.wavesurfer.play();
        document.title =
          "Playing '" + this.currentSong.SongName + "' by " + this.currentSong.ArtistName;
        document.getElementById("pause" + song.SongID).style.display = "block";
        document.getElementById("play" + song.SongID).style.display = "none";
        document.getElementById("divPlay").style.display = "none";
        document.getElementById("divPause").style.display = "block";
      }
      // If a song has been selected before, but it's not the same song
      else {
        document.title = "Fury Music";
        this.setMediaMetaData(song); 
        document.getElementById("play" + this.currentSong.SongID).style.display =
          "block";
        document.getElementById("pause" + this.currentSong.SongID).style.display =
          "none";
        document.getElementById("load" + this.currentSong.SongID).style.display =
          "none";
        document.getElementById("divPlay").style.display = "block";
        document.getElementById("divPause").style.display = "none";
        document.getElementById(
          "play" + this.currentSong.SongID
        ).parentElement.parentElement.style.backgroundColor = "white";
        document.getElementById(
          "play" + this.currentSong.SongID
        ).parentElement.parentElement.style.color = "black";
        this.historyIndex++;
        this.songHistory.push(song);
        this.currentSong = song;
        this.wavesurfer.load(song.SongURL);
        document.getElementById(
          "play" + song.SongID
        ).parentElement.parentElement.style.backgroundColor =
          "rgba(0, 0, 0, 0.7)";
        document.getElementById(
          "play" + song.SongID
        ).parentElement.parentElement.style.color = "white";
        document.getElementById("load" + song.SongID).style.display = "block";
        document.getElementById("play" + song.SongID).style.display = "none";
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

      // Determines wether to search using query from search field or parameter
      if (value == undefined) {
        searchQuery = document.getElementById("searchSong").value.toLowerCase();
      } else {
        searchQuery = value.toLowerCase();
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
      if (btn.style.opacity == "0.25") {
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
      this.playSong(next);
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
    minimizeMaximizePlayer(mode) {
      if (mode == "min") {
        document.getElementById("divCenter").style.bottom = "85px";
        document.getElementById("divPlayerControls").style.display = "none";
        document.getElementById("divPlayerMinimize").style.display = "none"; 
        document.getElementById("divPlayerMaximize").style.display = "block"; 
        document.getElementById("divPlayerOptions").style.display = "none";
      } else if (mode == "max") {
        document.getElementById("divCenter").style.bottom = "190px";
        document.getElementById("divPlayerMaximize").style.display = "none";

        setTimeout(function() {
          document.getElementById("divPlayerMinimize").style.display = "block";
          document.getElementById("divPlayerOptions").style.display = "block";
        }, 1000);
        document.getElementById("divPlayerControls").style.display = "block";
      }
    },
    playLinkedSong() {
      const urlParams = new URLSearchParams(window.location.search);
      let songlink = urlParams.get("songlink");
      if (songlink != null) {
        let song;
        for (let i = 0; i < this.songs.length; i++) {
          if(this.songs[i].SongID == songlink) {
            song = this.songs[i];
          }
        }
        this.playSong(song); 
        window.history.pushState("", "", "/");
      }
      
    },
    copySongLink(songid) {
      let link = window.location.origin + "/?songlink=" + songid; 
      navigator.clipboard.writeText(link).then(function() {
          /* clipboard successfully set */
          Ozone.fire("success", "Song link has been copied","top-right");
        }, function() {
          /* clipboard write failed */
        });

    },
    signOut() {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      window.location.replace(location + "/?signedout=true");
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
              setTimeout(function() {
                self.playLinkedSong(); 
              }, 1500); 
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
      backend: "MediaElement",
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
      self.elapsedPlaytime = self.currentSong.Length;
      document.getElementById("play" + self.currentSong.SongID).style.display =
        "block";
      document.getElementById("pause" + self.currentSong.SongID).style.display =
        "none";
      document.getElementById("divPlay").style.display = "block";
      document.getElementById("divPause").style.display = "none";

        setTimeout(function() {
          if(!self.wavesurfer.isPlaying() && !self.loading)
            self.playNext();
        }, 3000);
      
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
      self.loading = true;
      document.title = "Fury Music";
      self.elapsedPlaytime = "0:00";
      document.getElementById("play" + self.currentSong.SongID).style.display =
        "none";
      document.getElementById("divPlay").style.opacity = "0.25";
      document.getElementById("divPlay").style.pointerEvents = "none";
      document.getElementById("wavesurferVolume").style.opacity = "0.25";
      document.getElementById("wavesurferVolume").style.pointerEvents = "none";
      document.getElementById("volumeMute").style.opacity = "0.25";
      document.getElementById("volumeMute").style.pointerEvents = "none";
      document.getElementById("stepForward").style.opacity = "0.25";
      document.getElementById("stepForward").style.pointerEvents = "none";
      document.getElementById("stepBackwards").style.opacity = "0.25";
      document.getElementById("stepBackwards").style.pointerEvents = "none";
      document.getElementById("volumeUp").style.opacity = "0.25";
      document.getElementById("volumeUp").style.pointerEvents = "none";
      document.getElementById("load" + self.currentSong.SongID).style.display =
        "block";
      document.getElementById("songLoader").style.display = "block";
      document.getElementById("songLoaderProgress").innerHTML = progress + "%";

      if (localStorage.getItem("volumeLog")) {
        self.wavesurfer.setVolume(localStorage.getItem("volumeLog"));
      }
    });

    // Fires when wavesurfer is ready
    this.wavesurfer.on("waveform-ready", function() {
      self.loading = false;
      document.getElementById("songLoader").style.display = "none";
      document.getElementById("divPlay").style.opacity = "1";
      document.getElementById("divPlay").style.pointerEvents = "auto";
      document.getElementById("wavesurferVolume").style.opacity = "1";
      document.getElementById("wavesurferVolume").style.pointerEvents = "auto";
      document.getElementById("stepForward").style.opacity = "1";
      document.getElementById("stepForward").style.pointerEvents = "auto";
      if (self.historyIndex > 1) {
        document.getElementById("stepBackwards").style.opacity = "1";
        document.getElementById("stepBackwards").style.pointerEvents = "auto";
      }
      document.getElementById("volumeMute").style.opacity = "1";
      document.getElementById("volumeMute").style.pointerEvents = "auto";
      document.getElementById("volumeUp").style.opacity = "1";
      document.getElementById("volumeUp").style.pointerEvents = "auto";
      document.getElementById("play" + self.currentSong.SongID).style.display =
        "block";
      document.getElementById("load" + self.currentSong.SongID).style.display =
        "none";
      self.elapsedPlaytime = "0:00";
      self.wavePlayPauseToggle("play");
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
  right: 20px;
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
  background-color: rgba(0, 0, 0, 0.65);
  height: 26px; 
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

#divUser {
  right: 165px;
  top: 5px;
  border: none;
  padding: 60px;
}

#btnSignOut {
  /* position: absolute; */
  right: 35px;
  top: 7px;
  border: none;
  padding: 5px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  transition: 0.3s;
}

#divTopItems {
  display: flex;
  position: absolute;
  height: inherit;
  width: 550px;
  right: 0; 
  justify-content: center; 
  align-items: center;
}

.songPaneItem:hover {
  text-decoration: underline;
  cursor: pointer;
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
  padding-right: 45px;
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
  padding-left: 192px;
}

.tableSongsHeaderPublisher {
  padding-left: 128px;
}

.tableSongsHeaderArtist {
  padding-left: 347px;
}

.tableSongsHeaderAlbum {
  padding-left: 258px;
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
  left: 171px;
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
  top: 10px;
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
  top: 0;
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
  margin-top: 150px;
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
  bottom: 85px;
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
  animation-duration: 1s;
  animation-iteration-count: 1;
  cursor: pointer;
}

#divPlayerMaximize {
  display: none;
  position: absolute;
  text-align: center;
  bottom: 0px;
  left: 48%;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  animation-duration: 1s;
  animation-iteration-count: 1;
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
  box-shadow: 2px 4px 10px #000000;
}

#fontShareSong:hover {
  color: grey !important; 
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

#btnSignOut:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #8b0000;
}

#divPlayerWrapper {
  width: 100%;
  height: 100%;
}

.animation-move-up {
  animation: move-up 1s ease 1;
}

@keyframes move-up {
  0% {
    bottom: 0;
  }
  100% {
    bottom: 130px;
  }
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
