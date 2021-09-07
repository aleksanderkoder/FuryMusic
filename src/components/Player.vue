<template>
  <div id="divPlayerWrapper">
    <div id="divTopbar" class="animate__animated animate__fadeInDown">
      <div id="divTopItems">
        <div id="divSearchSong">
          <font-awesome-icon style="color: black" :icon="['fas', 'search']" />
          <input
            type="text"
            id="searchSong"
            v-on:input="searchSong()"
            placeholder="Search"
          />
        </div>
        <div id="divUser">
          <font-awesome-icon
            style="color: white"
            :icon="['fas', 'user-circle']"
          />
          {{ $store.state.username }}
        </div>
        <button id="btnSignOut" v-on:click="signOut()">
          <font-awesome-icon
            style="color: black"
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
        title="Fury Music"
        alt="Fury Music logo"
        class="animate__animated animate__pulse animate__infinite animate__slow"
      />
      <h3>Your library</h3>

      <span class="sidebarTitle" v-on:click="resetSearch()"
        >All public songs</span
      >
      <span class="sidebarTitle" v-on:click="searchSong($store.state.username)"
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
        class="animate__animated animate__fadeInLeft"
      >
        <img
          id="SongCoverImage"
          v-bind:src="currentSong.SongImageURL"
          width="65%"
        />
        <p
          class="clickToSearch two-line"
          style="font-weight: bold"
          id="pSidebarTitle"
          v-bind:title="currentSong.SongName"
          v-on:click="searchSong(currentSong.SongName)"
        >
          {{ currentSong.SongName }}
        </p>
        <p
          class="clickToSearch ellipsis"
          v-bind:title="currentSong.ArtistName"
          v-on:click="searchSong(currentSong.ArtistName)"
        >
          {{ currentSong.ArtistName }}
        </p>
      </div>
    </div>

    <div id="divCenter" class="divCenter">
      <div v-if="loggedIn">
        <div
          id="divCenterHeader"
          class="animate__animated animate__fadeInRight"
        >
          <div class="divSongsHeader">
            <div class="divSongsHeaderTitle">
              <span>Title</span>
            </div>
            <div class="divSongsHeaderArtist">
              <span>Artist</span>
            </div>
            <div class="divSongsHeaderAlbum">
              <span>Album</span>
            </div>
            <div class="divSongsHeaderLength">
              <span>Length</span>
            </div>
            <div class="divSongsHeaderPublisher">
              <span>Published by</span>
            </div>
          </div>
        </div>
        <div
          id="divSongPane"
          v-for="song in songs"
          :key="song.SongID"
          v-show="song.Show"
          v-on:click="dblclickPlay(song)"
          class="animate__animated animate__slideInRight"
        >
          <div class="divSongsPlay">
            <font-awesome-icon
              v-bind:id="'play' + song.SongID"
              v-on:click="playSong(song)"
              class="fontSongPane"
              :icon="['fas', 'play']"
            />
            <font-awesome-icon
              v-bind:id="'pause' + song.SongID"
              v-on:click="pauseSong(song.SongID)"
              class="fontSongPane"
              style="display: none;"
              :icon="['fas', 'pause']"
            />
            <font-awesome-icon
              v-bind:id="'load' + song.SongID"
              class="fontSongPane"
              style="display: none; filter:"
              :icon="['fas', 'circle-notch']"
              spin
            />
          </div>
          <div class="divSongsSongName ellipsis">
            <span v-bind:title="song.SongName">{{ song.SongName }}</span>
          </div>
          <div class="divSongsArtistName ellipsis">
            <span
              class="clickToSearch"
              v-bind:title="song.ArtistName"
              v-on:click="searchSong(song.ArtistName)"
              >{{ song.ArtistName }}</span
            >
          </div>
          <div class="divSongsSongAlbum ellipsis">
            <span
              class="clickToSearch"
              v-bind:title="song.Album"
              v-on:click="searchSong(song.Album)"
              >{{ song.Album }}</span
            >
          </div>
          <div class="divSongsSongLength">
            <span v-bind:title="song.Length">{{ song.Length }}</span>
          </div>
          <div class="divSongsPublisher ellipsis">
            <span
              class="clickToSearch"
              v-bind:title="song.Publisher"
              v-on:click="searchSong(song.Publisher)"
              >{{ song.Publisher }}</span
            >
          </div>
          <div class="divSongsOptions ellipsis">
            <font-awesome-icon
              v-if="$store.state.username == song.Publisher"
              id="fontDeleteSong"
              :icon="['fas', 'trash-alt']"
              title="Delete"
              v-on:click="deleteSong(song.SongID, song.SongURL)"
            />
            <font-awesome-icon
              id="fontShareSong"
              :icon="['fas', 'share-alt']"
              title="Copy song link"
              v-on:click="copySongLink(song)"
            />
            <font-awesome-icon
              id="fontDownloadSong"
              :icon="['fas', 'cloud-download-alt']"
              title="Download"
              v-on:click="downloadSong(song.SongURL)"
            />
          </div>

          <img v-if="song.SongImageURL != undefined && song.SongImageURL != '' && song.SongImageURL != null" class="songPaneImage" v-bind:src="song.SongImageURL">
        </div>
      </div>
    </div>

    <div id="divPlayerControls" class="animate__animated animate__fadeInUp">
      <div id="controlsWrapper">
        <div id="divPlay" title="Play" v-on:click="wavePlayPauseToggle('play')" class="animation-pulse">
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
        <div id="divPause" title="Pause" v-on:click="wavePlayPauseToggle('pause')" class="animation-pulse">
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
          title="Next"
          v-on:click="playNext()"
          style="position: absolute; bottom: 55px; left: 153px; color: white; font-size: 17px; cursor: pointer;"
          :icon="['fas', 'step-forward']"
        />
        <font-awesome-icon
          id="stepBackwards"
          title="Previous"
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

    <div id="divHorizontalCenter">
      <p id="pZeroMatches" class="animate__animated animate__wobble">
        No matches were found
      </p>

      <font-awesome-icon
        id="centerLoader"
        :icon="['fas', 'circle-notch']"
        spin
      />

      <div id="songLoader" class="animate__animated animate__fadeInUp">
        <font-awesome-icon :icon="['fas', 'circle-notch']" spin />
        <span id="songLoaderProgress"></span>
      </div>

      <div
        id="divPlayerMinimize"
        title="Minimize player"
        v-on:click="minimizeMaximizePlayer('min')"
        class="animate__animated animate__flipInY"
      >
        <span id="spanPlayerMinimize">Minimize</span>
        <font-awesome-icon
          id="fontPlayerMinimize"
          :icon="['fas', 'sort-down']"
        />
      </div>

      <div
        id="divPlayerMaximize"
        title="Maximize player"
        v-on:click="minimizeMaximizePlayer('max')"
        class="animate__animated animate__flipInY"
      >
        <span id="spanPlayerMaximize">Maximize</span>
        <font-awesome-icon id="fontPlayerMaximize" :icon="['fas', 'sort-up']" />
      </div>
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

    <div
      id="customBackgroundImagePanel"
      @mouseover="uploadImgLabel = true"
      @mouseleave="uploadImgLabel = false"
      v-on:click="showCustomBackImg = true"
    >
      <span v-show="uploadImgLabel" class="animate__animated animate__bounceIn"
        >Change background image</span
      >
      <font-awesome-icon :icon="['fas', 'image']" />
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
      currentSong: {
        SongID: "",
        SongURL: "",
        SongName: "",
        ArtistName: "",
        Length: 0,
        Album: "",
        SongImageURL: ""
      },
      songHistory: [],
      historyIndex: 0,
      elapsedPlaytime: 0,
      showCustomBackImg: false,
      uploadImgLabel: false,
      showUploadSong: false,
      loading: false,
      oldVol: 0,
      toggleShuffle: false,
      dblclickCounter: 0,
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    };
  },
  props: {
    loggedIn: Boolean
  },
  methods: {
    dblclickPlay(song) {
      this.dblclickCounter++;
      let self = this;
      setTimeout(function() {
        self.dblclickCounter = 0; 
      }, 200);
      if(this.dblclickCounter >= 2) {
        if (this.currentSong.SongID != song.SongID) {
          this.playSong(song); 
        } else if(this.wavesurfer.isPlaying()){
          this.wavePlayPauseToggle("pause"); 
        } else {
          this.wavePlayPauseToggle("play"); 
        }
      }
    },
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
          "Playing '" +
          this.currentSong.SongName +
          "' by " +
          this.currentSong.ArtistName;
        document.getElementById("divPlay").style.display = "none";
        document.getElementById("divPause").style.display = "block";
        document.getElementById(
          "play" + this.currentSong.SongID
        ).style.display = "none";
        document.getElementById(
          "pause" + this.currentSong.SongID
        ).style.display = "block";
      } else if (mode == "pause") {
        this.wavesurfer.pause();
        document.title = "Paused";
        document.getElementById("divPause").style.display = "none";
        document.getElementById("divPlay").style.display = "block";

        document.getElementById(
          "pause" + this.currentSong.SongID
        ).style.display = "none";
        document.getElementById(
          "play" + this.currentSong.SongID
        ).style.display = "block";
      }
    },
    setMediaMetaData(song) {
      let self = this;
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song.SongName,
          artist: song.ArtistName,
          album: song.Album
          // artwork: {src: song.SongImageURL, type: 'image'} TO DO: FIX THIS SO IT WORKS!
        });

        navigator.mediaSession.setActionHandler("play", function() {
          self.wavePlayPauseToggle("play");
        });
        navigator.mediaSession.setActionHandler("pause", function() {
          self.wavePlayPauseToggle("pause");
        });
        navigator.mediaSession.setActionHandler("previoustrack", function() {
          self.playPrevious();
        });
        navigator.mediaSession.setActionHandler("nexttrack", function() {
          self.playNext();
        });

        // navigator.mediaSession.setActionHandler('seekbackward', function() {});
        // navigator.mediaSession.setActionHandler('seekforward', function() {});
      }
    },
    playSong(song) {
      if (this.loading) return; // If something is already loading, don't do anything, temp workaround for an issue

      if (
        !document
          .getElementById("divCenter")
          .classList.contains("divCenterRetrackted")
      )
        this.minimizeMaximizePlayer("max");

      // If no song is selected, load selected song
      if (this.currentSong.SongID == "") {
        this.setMediaMetaData(song);
        this.songHistory.push(song);
        this.historyIndex++;
        this.currentSong = song;
        this.wavesurfer.load(song.SongURL);
        document
          .getElementById("play" + song.SongID)
          .parentElement.parentElement.classList.toggle("divSongPaneSelected");
        document.getElementById("play" + song.SongID).style.display = "none";
        document.getElementById("load" + song.SongID).style.display = "block";
      }
      // Continues paused/plays loaded song
      else if (this.currentSong.SongID == song.SongID) {
        this.wavesurfer.play();
        document.title =
          "Playing '" +
          this.currentSong.SongName +
          "' by " +
          this.currentSong.ArtistName;
        document.getElementById("pause" + song.SongID).style.display = "block";
        document.getElementById("play" + song.SongID).style.display = "none";
        document.getElementById("divPlay").style.display = "none";
        document.getElementById("divPause").style.display = "block";
      }
      // If a song has been selected before, but it's not the same song
      else {
        document.title = "Fury Music";
        this.setMediaMetaData(song);
        document.getElementById(
          "play" + this.currentSong.SongID
        ).style.display = "block";
        document.getElementById(
          "pause" + this.currentSong.SongID
        ).style.display = "none";
        document.getElementById(
          "load" + this.currentSong.SongID
        ).style.display = "none";
        document.getElementById("divPlay").style.display = "block";
        document.getElementById("divPause").style.display = "none";
        document
          .getElementById("play" + this.currentSong.SongID)
          .parentElement.parentElement.classList.toggle("divSongPaneSelected");
        this.historyIndex++;
        this.songHistory.push(song);
        this.currentSong = song;
        this.wavesurfer.load(song.SongURL);
        document
          .getElementById("play" + song.SongID)
          .parentElement.parentElement.classList.toggle("divSongPaneSelected");
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
      //document.getElementById("searchSong").value = "";
      document.getElementById("pZeroMatches").style.display = "none";
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
      document.getElementById("pZeroMatches").style.display = "flex";
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
        } else {
          document.getElementById("pZeroMatches").style.display = "none";
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
                  Ozone.fire(
                    "success",
                    "Song has been deleted",
                    "bottom-middle"
                  );
                  setTimeout( () => {
                    location.reload();
                  }, 3000);
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
      let self = this;
      if (mode == "min") {
        document
          .getElementById("divCenter")
          .classList.toggle("divCenterRetrackted");
        document.getElementById("divPlayerControls").style.display = "none";
        document.getElementById("divPlayerMinimize").style.display = "none";
        document.getElementById("divPlayerMaximize").style.display = "block";
        document.getElementById("divPlayerOptions").style.display = "none";
      } else if (mode == "max") {
        document
          .getElementById("divCenter")
          .classList.toggle("divCenterRetrackted");
        document.getElementById("divPlayerMaximize").style.display = "none";

        setTimeout(function() {
          document.getElementById("divPlayerMinimize").style.display = "block";
          document.getElementById("divPlayerOptions").style.display = "block";
        }, 1000);
        document.getElementById("divPlayerControls").style.display = "block";
        self.wavesurfer.drawBuffer(); 
      }
    },
    playLinkedSong() {
      const urlParams = new URLSearchParams(window.location.search);
      let songid= urlParams.get("songid");
      if (songid != null) {
        let song;
        for (let i = 0; i < this.songs.length; i++) {
          if (this.songs[i].SongID == songid) {
            song = this.songs[i];
          }
        }
        this.playSong(song);
        window.history.pushState("", "", "/");
      }
    },
    copySongLink(song) {
      let link =
        window.location.origin +
        "/?songid=" +
        encodeURIComponent(song.SongID) +
        //"&url=" +
        // encodeURIComponent(song.SongURL) +
        "&title=" +
        encodeURIComponent(song.SongName) +
        "&artist=" +
        encodeURIComponent(song.ArtistName) +
        "&image=" + encodeURIComponent(song.SongImageURL); 
      navigator.clipboard.writeText(link).then(
        function() {
          /* clipboard successfully set */
          Ozone.fire("success", "Song link has been copied", "top-right");
        },
        function() {
          /* clipboard write failed */
          Ozone.fire("error", "Couldn't copy to clipboard", "top-right");
        }
      );
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
              document.getElementById("centerLoader").style.display = "none";
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
        if (!self.wavesurfer.isPlaying() && !self.loading) self.playNext();
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
    let runOnce = false;
    this.wavesurfer.on("loading", function(progress) {
      if (!runOnce) {
        document.title = "Fury Music";
        self.elapsedPlaytime = "0:00";
        document.getElementById(
          "play" + self.currentSong.SongID
        ).style.display = "none";
        document.getElementById("divPlay").classList.toggle("disabled");
        document
          .getElementById("wavesurferVolume")
          .classList.toggle("disabled");
        document.getElementById("volumeMute").classList.toggle("disabled");
        document.getElementById("stepForward").classList.toggle("disabled");
        if (
          !document
            .getElementById("stepBackwards")
            .classList.contains("disabled")
        ) {
          document.getElementById("stepBackwards").classList.toggle("disabled");
        }

        document.getElementById("volumeUp").classList.toggle("disabled");
        document.getElementById(
          "load" + self.currentSong.SongID
        ).style.display = "block";
        document.getElementById("songLoader").style.display = "block";
        if (localStorage.getItem("volumeLog")) {
          self.wavesurfer.setVolume(localStorage.getItem("volumeLog"));
        }
        runOnce = true;
        self.loading = true;
      }
      document.getElementById("songLoaderProgress").innerHTML = progress + "%";
    });

    // Fires when wavesurfer is ready
    this.wavesurfer.on("waveform-ready", function() {
      self.loading = false;
      runOnce = false;
      document.getElementById("songLoader").style.display = "none";
      document.getElementById("divPlay").classList.toggle("disabled");
      document.getElementById("wavesurferVolume").classList.toggle("disabled");
      document.getElementById("stepForward").classList.toggle("disabled");
      if (self.historyIndex > 1) {
        document.getElementById("stepBackwards").classList.toggle("disabled");
      }
      document.getElementById("volumeMute").classList.toggle("disabled");
      document.getElementById("volumeUp").classList.toggle("disabled");
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
#pZeroMatches {
  display: none;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 10px;
  color: white;
}

.songPaneImage {
  position: absolute;
  margin-top: -10px;
  margin-left: -10px;
  padding: -10px;
  height: 40px; 
  width: 40px;
  right: 0;  
}

#customBackgroundImagePanel {
  position: fixed;
  right: 20px;
  bottom: 150px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
  border-radius: 3px;
  z-index: 1;
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
  z-index: 1;
  cursor: pointer;
}

#divSearchSong {
  background-color: white;
  height: 24px;
  border-radius: 100px;
  padding-left: 10px;
  padding-right: 10px;
}

#searchSong {
  border: none;
  color: rgb(0, 0, 0);
  background-color: transparent;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 4px; */
  height: 25px;
}

#searchSong::placeholder {
  color: black;
}

#centerLoader {
  background-color: rgba(0, 0, 0, 0.8); 
  padding: 10px;
  color: white; 
  border-radius: 100%; 
  font-size: 37px;
}

#divUser {
  padding: 0px 60px 0px 60px;
  color: white; 
}

.disabled {
  pointer-events: none;
  opacity: 0.25;
}

#btnSignOut {
  height: 24px;
  border: none;
  padding: 5px;
  border-radius: 3px;
  background-color: white;
  color: black;
  transition: 0.2s;
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

.clickToSearch:hover {
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

.fontSongPane {
  color: white;
  cursor: pointer;
  filter: drop-shadow(0px 0px 5px #000000); 
  transition: 0.3s;
}

.fontSongPane:hover {
  color: rgba(255,255,255, 0.7); 
}

.divSongsPlay {
  flex: 0 0 2.5%;
  /* padding-left: 75px;  */
}

.divSongsSongName {
  flex: 0 0 15%;
  padding-right: 5%;
}

.divSongsArtistName {
  flex: 0 0 15%;
  padding-right: 5%;
}

.divSongsSongLength {
  flex: 0 0 5%;
}

.divSongsPublisher {
  flex: 0 0 15%;
  padding-left: 5%;
}

.divSongsSongAlbum {
  flex: 0 0 15%;
  padding-right: 5%;
}

.divSongsOptions {
  position: absolute;
  right: 70px;
}

#divCenterHeader {
  position: fixed;
  top: 31px;
  left: 170px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.25);
  padding-top: 6px;
  padding-bottom: 7px;
  margin-left: 1px;
  color: white;
  white-space: nowrap;
}

.divSongsHeader {
  text-align: left;
  display: flex;
  width: 95%;
  margin-left: 15px;
  margin-right: 15px;
}

.divSongsHeaderTitle {
  flex: 0 0 15%;
  padding-left: 3%;
}

.divSongsHeaderLength {
  flex: 0 0 5%;
}

.divSongsHeaderPublisher {
  flex: 0 0 17.5%;
  padding-left: 5%;
}

.divSongsHeaderArtist {
  flex: 0 0 20%;
  padding-left: 5%;
}

.divSongsHeaderAlbum {
  flex: 0 0 15%;
  padding-right: 4.75%;
}

#divSongPane {
  display: flex;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.8); 
  color: white; 
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  padding: 10px;
  width: 95%;
  height: 20px;
  margin-top: 15px;
  margin-left: 15px;
  transition: 0.2s;
}

#divSongPane:hover {
  background-color: white !important;
  color: black !important;
}

.divSongPaneSelected {
  background-color: white !important;
  color: black !important;
}

font-awesome-icon {
  background-color: transparent !important;
}

#pSidebarTitle {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
   -webkit-box-orient: vertical;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#divTopbar {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.9);  
  height: 27px;
  left: 171px;
  right: 0;
  /* box-shadow: 0 4px 2px -2px gray; */
  z-index: 1;
  padding: 2px;
  text-align: left;
}

#logo {
  margin-top: 20px;
  margin-bottom: 45px;
  width: 65px;
}

#divSidebarCurrentSongInfo {
  color: white;
  position: absolute;
  bottom: 0;
  width: 90%;
}

#divSidebar {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  width: 170px;
  top: 0;
  bottom: 0;
  z-index: 1;
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
  z-index: 1;
  display: none;
}

#songLoader {
  display: none;
  position: absolute;
  color: white;
  font-size: 36px;
  bottom: 60px;
  z-index: 1;
}

#divHorizontalCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

#songLoaderProgress {
  position: absolute;
  display: block;
  font-size: 20px;
  padding-top: 10px;
}

#btnUploadSong {
  position: absolute;
  bottom: 265px;
  left: 0;
  background-color: transparent;
  border: none;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  color: grey;
  width: inherit;
  padding: 10px;
  font-family: "Monsterrat", sans-serif;
  transition: 0.3s;
}

#btnUploadSong:hover {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  color: white;
}

.divCenter {
  position: absolute;
  left: 170px;
  right: 0px;
  bottom: 105px;
  top: 62px;
  z-index: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.divCenterRetrackted {
  bottom: 210px;
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

.two-line {
  overflow-wrap: break-word;
}

#divPlayerMinimize {
  display: none;
  position: absolute;
  text-align: center;
  bottom: 130px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  animation-duration: 1s;
  animation-iteration-count: 1;
  z-index: 1;
  cursor: pointer;
}

#divPlayerMaximize {
  display: none;
  position: absolute;
  text-align: center;
  bottom: 0px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  animation-duration: 1s;
  animation-iteration-count: 1;
  z-index: 1;
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

.sidebarTitle {
  display: block;
  width: 100%;
  position: relative;
  color: white;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s;
}

.sidebarTitle:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

#SongCoverImage {
  box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.75);
}

#fontDeleteSong,
#fontShareSong,
#fontDownloadSong {
  color: grey;
  transition: 0.3s;
  cursor: pointer;
  padding-left: 10px;
}

#fontShareSong:hover {
  color: black !important;
}

#fontDownloadSong:hover {
  color: rgb(49, 113, 134) !important;
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
  background-color: rgb(194, 79, 79);
}

#divPlayerWrapper {
  width: 100%;
  height: 100%;
}

.animation-pulse {
  animation: btnpulse 1s; 
}

@keyframes btnpulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.25);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
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
