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

    <div id="divBanner" class="animate__animated animate__fadeInUp">
      <img
        id="imgBannerImage"
        src=""
        v-tilt="{ speed: 400, perspective: 500 }"
      />
      <div id="divBannerInfoWrapper">
        <span id="spanBannerHeader"></span>
        <span id="spanBannerDesc"></span>
      </div>
    </div>

    <div id="divSidebar" class="animate__animated animate__fadeInLeft">
      <img
        id="logo"
        src="../assets/fury-logo-prototype.webp"
        title="Fury Music"
        alt="Fury Music logo"
        v-on:click="resetSearch()"
        width="115"
      />
      <h3>
        <font-awesome-icon style="font-size: 18px" :icon="['fas', 'stream']" />
        LIBRARY
      </h3>

      <span class="sidebarTitle" v-on:click="resetSearch()"
        >All public tracks</span
      >
      <span class="sidebarTitle" v-on:click="searchSong($store.state.username)"
        >My uploaded tracks</span
      >

      <div id="divPlaylists">
        <h3>
          <font-awesome-icon style="font-size: 18px" :icon="['fas', 'list']" />
          PLAYLISTS
        </h3>
        <!-- TODO: Make function for creating new playlist -->
        <button id="btnNewPlaylist" v-on:click="createNewPlaylist()">
          <font-awesome-icon style="color: grey" :icon="['fas', 'plus']" />
          New playlist
        </button>
      </div>

      <button
        id="btnUploadSong"
        v-on:click="$store.commit('showUploadSongComponent')"
      >
        <font-awesome-icon style="color: grey" :icon="['fas', 'plus']" />
        Upload track
      </button>

      <canvas id="canvasVisualizer"> </canvas>

      <div
        id="divSidebarCurrentSongInfo"
        v-show="currentSong.SongName"
        class="animate__animated animate__fadeInLeft"
      >
        <img
          id="SongCoverImage"
          width="120"
          height="120"
          alt="Track cover image"
          v-bind:src="currentSong.SongImageURL"
          v-show="currentSong.SongImageURL"
          v-tilt="{ speed: 400, perspective: 500 }"
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
          id="pSidebarArtist"
          class="clickToSearch ellipsis"
          v-bind:title="currentSong.ArtistName"
          v-on:click="searchSong(currentSong.ArtistName, currentSong, 'artist')"
        >
          {{ currentSong.ArtistName }}
        </p>
      </div>
    </div>

    <div id="divCenter" class="divCenter">
      <div v-if="loggedIn">
        <div
          id="divCenterHeader"
          class="divCenterHeader animate__animated animate__fadeInRight"
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
          v-on:click="dblClickPlay(song)"
          class="animate__animated animate__fadeInRight"
          @mouseover="showRunningIcon(song.SongID)"
          @mouseleave="hideRunningIcon(song.SongID)"
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
              style="display: none; color: black; filter: none;"
              :icon="['fas', 'circle-notch']"
              spin
            />
            <img
              v-bind:id="'running' + song.SongID"
              class="runningSongIcon"
              src="/src/assets/sound trans ani.gif"
              width="20"
            />
          </div>
          <div class="divSongsSongName ellipsis">
            <span v-bind:title="song.SongName">{{ song.SongName }}</span>
          </div>
          <div class="divSongsArtistName ellipsis">
            <span
              class="clickToSearch"
              v-bind:title="song.ArtistName"
              v-on:click="searchSong(song.ArtistName, song, 'artist')"
              >{{ song.ArtistName }}</span
            >
          </div>
          <div class="divSongsSongAlbum ellipsis">
            <span
              class="clickToSearch"
              v-bind:title="song.Album"
              v-on:click="searchSong(song.Album, song, 'album')"
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

          <img
            v-if="
              song.SongImageURL != undefined &&
                song.SongImageURL != '' &&
                song.SongImageURL != null
            "
            class="songPaneImage"
            v-bind:src="song.SongImageURL"
          />
        </div>
      </div>
    </div>

    <div id="divPlayerControls" class="animate__animated animate__fadeInUp">
      <div id="divControlsWrapper">
        <font-awesome-icon
          id="stepBackwards"
          title="Previous"
          v-on:click="playPrevious()"
          :icon="['fas', 'step-backward']"
        />
        <div
          id="divPlay"
          v-tilt="{ max: 25, perspective: 200 }"
          title="Play"
          v-on:click="wavePlayPauseToggle('play')"
          class="animation-pulse"
        >
          <font-awesome-icon
            id="playButton"
            style="
              font-size: 35px;
              color: white;
              filter: drop-shadow(0px 0px 5px #000000);
              margin-top: 27%;
              margin-left: 12%;
            "
            :icon="['fas', 'play']"
          />
        </div>
        <div
          id="divPause"
          v-tilt="{ max: 25, perspective: 200 }"
          title="Pause"
          v-on:click="wavePlayPauseToggle('pause')"
          class="animation-pulse"
        >
          <font-awesome-icon
            id="pauseButton"
            style="
              font-size: 35px;
              color: white;
              filter: drop-shadow(0px 0px 5px #000000);
              margin-top: 27%;
              margin-left: 2%;
            "
            :icon="['fas', 'pause']"
          />
        </div>
        <font-awesome-icon
          id="stepForwards"
          title="Next"
          v-on:click="playNext()"
          :icon="['fas', 'step-forward']"
        />
        <font-awesome-icon
          id="volumeUp"
          title="Mute"
          v-on:click="mute()"
          style="position: absolute; bottom: 15px; left: 30px; color: white; font-size: 17px; cursor: pointer;"
          :icon="['fas', 'volume-up']"
        />
        <font-awesome-icon
          id="volumeMute"
          title="Unmute"
          v-on:click="unmute()"
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
      <div id="waveform"></div>
      <span id="spanTotalPlaytime">{{ currentSong.Length }}</span>
    </div>

    <div id="divAbsoluteCenter">
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
        <font-awesome-icon
          id="fontPlayerMinimize"
          :icon="['fas', 'sort-down']"
        />
        <span id="spanPlayerMinimize">Minimize</span>
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
      v-on:click="$store.commit('showCustomImageComponent')"
    >
      <span v-show="uploadImgLabel" class="animate__animated animate__bounceIn"
        >Change background image</span
      >
      <font-awesome-icon :icon="['fas', 'image']" />
    </div>

    <UploadBackImg v-show="$store.state.showCustomImage" />

    <UploadSong v-show="$store.state.showUploadSong" />
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
      mediaElem: null,
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
      uploadImgLabel: false,
      loading: false,
      oldVol: 0,
      toggleShuffle: false,
      dblclickCounter: 0,
      muteStatus: false,
      isFading: false,
      finished: false, // Is needed for an issue where the "finish" event is fired multiple times when using MediaElement
      apiURL: "https://furymusicplayer.000webhostapp.com/scripts/"
    };
  },
  props: {
    loggedIn: Boolean
  },
  methods: {
    visualizerInit() {
      var context = new AudioContext();
      var src = context.createMediaElementSource(this.mediaElem);
      var analyser = context.createAnalyser();

      var canvas = document.getElementById("canvasVisualizer");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext("2d");

      src.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 256;

      var bufferLength = analyser.frequencyBinCount;

      var dataArray = new Uint8Array(bufferLength);

      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;

      var barWidth = Math.round((WIDTH / bufferLength) * 2.5);
      var barHeight;
      var x = 0;

      let self = this;
      function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          // var r = barHeight + 25 * (i / bufferLength);
          // var g = 250 * (i / bufferLength);
          // var b = 50;
          // console.log(x)
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth;
        }
      }
      renderFrame();
    },
    showRunningIcon(id) {
      if (
        this.currentSong.SongID != id ||
        this.muteStatus ||
        !this.wavesurfer.isPlaying()
      )
        return;
      document.getElementById("running" + id).style.display = "none";
      document.getElementById("pause" + id).style.display = "block";
    },
    hideRunningIcon(id) {
      if (
        this.currentSong.SongID != id ||
        this.muteStatus ||
        !this.wavesurfer.isPlaying()
      )
        return;
      document.getElementById("running" + id).style.display = "block";
      document.getElementById("pause" + id).style.display = "none";
    },
    dblClickPlay(song) {
      this.dblclickCounter++;
      let self = this;
      setTimeout(function() {
        self.dblclickCounter = 0;
      }, 250);
      if (this.dblclickCounter >= 2) {
        if (this.currentSong.SongID != song.SongID) {
          this.playSong(song);
        } else if (this.wavesurfer.isPlaying()) {
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
      if (this.isFading) return;

      if (mode == "play") {
        this.volumeFadeIn();
        document.title =
          "Playing " +
          this.currentSong.SongName +
          " by " +
          this.currentSong.ArtistName;
        document.getElementById("divPlay").style.display = "none";
        document.getElementById("divPause").style.display = "block";
        document.getElementById(
          "play" + this.currentSong.SongID
        ).style.display = "none";
        // document.getElementById(
        //   "pause" + this.currentSong.SongID
        // ).style.display = "block";
        document.getElementById(
          "running" + this.currentSong.SongID
        ).style.display = "block";
      } else if (mode == "pause") {
        this.volumeFadeOut();
        // this.wavesurfer.pause();
        document.title = "Paused";
        document.getElementById("divPause").style.display = "none";
        document.getElementById("divPlay").style.display = "block";

        document.getElementById(
          "pause" + this.currentSong.SongID
        ).style.display = "none";
        document.getElementById(
          "running" + this.currentSong.SongID
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
    volumeFadeIn() {
      this.wavesurfer.setVolume(0);
      this.wavesurfer.setMute(false);
      this.muteStatus = false;
      this.isFading = true;
      this.wavesurfer.play();
      let int = setInterval(() => {
        if (
          this.wavesurfer.getVolume() <
          localStorage.getItem("volume") / 100 - 0.1
        ) {
          this.wavesurfer.setVolume(this.wavesurfer.getVolume() + 0.1);
        } else {
          this.isFading = false;
          clearInterval(int);
        }
      }, 50);
    },
    volumeFadeOut() {
      this.muteStatus = true;
      this.isFading = true;
      let int = setInterval(() => {
        if (this.wavesurfer.getVolume() > 0.1) {
          this.wavesurfer.setVolume(this.wavesurfer.getVolume() - 0.1);
        } else {
          this.isFading = false;
          this.wavesurfer.pause();
          clearInterval(int);
        }
      }, 50);
    },
    handleAudioContextState() {
      if (!this.wavesurfer) {
        this.initWavesurfer();
      }

      if (this.wavesurfer.backend.ac.state == "suspended") {
        this.wavesurfer.backend.ac.resume();
        console.log("Sat Wavesurfer backend state to 'running'");
      }

      if (!this.mediaElem) {
        // Init media element used for rendering the audio visualizer
        this.mediaElem = document.createElement("audio");
        this.mediaElem.crossOrigin = "anonymous";
        this.visualizerInit();
        console.log("Initialized media context state for audio visualizer");
      }
    },
    initWavesurfer() {
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
        responsive: true,
        hideScrollbar: true
      });
      console.log("Created Wavesurfer instance");
      this.subscribeToWavesurferInstance();
    },
    playSong(song) {
      if (this.loading || this.isFading) return; // If something is already loading, don't do anything, temp work-around for an issue

      this.handleAudioContextState(); // Needed to prevent autoplay from being blocked by Chromium autoplay policy

      if (
        !document
          .getElementById("divCenter")
          .classList.contains("divCenterRetractedBottom")
      )
        this.minimizeMaximizePlayer("max");

      // If no song is selected, load selected song
      if (this.currentSong.SongID == "") {
        this.setMediaMetaData(song);
        this.songHistory.push(song);
        this.historyIndex++;
        this.currentSong = song;
        this.mediaElem.src = song.SongURL;
        this.wavesurfer.load(this.mediaElem);
        document
          .getElementById("play" + song.SongID)
          .parentElement.parentElement.classList.toggle("divSongPaneSelected");
        document.getElementById("play" + song.SongID).style.display = "none";
        document.getElementById("load" + song.SongID).style.display = "block";
      }
      // Continues paused song
      else if (this.currentSong.SongID == song.SongID) {
        this.volumeFadeIn();
        document.title =
          "Playing " +
          this.currentSong.SongName +
          " by " +
          this.currentSong.ArtistName;
        // document.getElementById("pause" + song.SongID).style.display = "block";
        document.getElementById("running" + song.SongID).style.display =
          "block";
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
          "running" + this.currentSong.SongID
        ).style.display = "none";
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
        this.mediaElem.src = song.SongURL;
        this.wavesurfer.load(this.mediaElem);
        document
          .getElementById("play" + song.SongID)
          .parentElement.parentElement.classList.toggle("divSongPaneSelected");
        document.getElementById("load" + song.SongID).style.display = "block";
        document.getElementById("play" + song.SongID).style.display = "none";
      }
    },
    pauseSong(SongID) {
      if (!this.isFading) {
        this.volumeFadeOut();
        document.getElementById("play" + SongID).style.display = "block";
        document.getElementById("pause" + SongID).style.display = "none";
        document.getElementById("divPlay").style.display = "block";
        document.getElementById("divPause").style.display = "none";
        document.getElementById("running" + SongID).style.display = "none";
        document.title = "Paused";
      }
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
    showOrHideBanner(mode, showBannerObj = null, type = null) {
      if (type == "artist") {
        document.getElementById("spanBannerHeader").innerHTML =
          showBannerObj.ArtistName;
        document.getElementById("spanBannerDesc").innerHTML =
          "Showing tracks by this artist";
      } else if (type == "album") {
        document.getElementById("spanBannerHeader").innerHTML =
          showBannerObj.Album;
        document.getElementById("spanBannerDesc").innerHTML =
          "Album by " + showBannerObj.ArtistName;
      }

      if (mode == "show") {
        // Change styling of relevant HTML
        document
          .getElementById("divCenter")
          .classList.add("divCenterRetractedTop");
        document.getElementById("divBanner").style.display = "flex";
        document
          .getElementById("divCenterHeader")
          .classList.add("divCenterHeaderRetracted");

        // Populate HTML with the information
        if (showBannerObj.SongImageURL) {
          document.getElementById("imgBannerImage").src =
            showBannerObj.SongImageURL;
        } else {
          document.getElementById("imgBannerImage").src = "";
        }
      } else if (mode == "hide") {
        // Change styling of relevant HTML
        document
          .getElementById("divCenter")
          .classList.remove("divCenterRetractedTop");
        document.getElementById("divBanner").style.display = "none";
        document
          .getElementById("divCenterHeader")
          .classList.remove("divCenterHeaderRetracted");
      }
    },
    resetSearch() {
      //document.getElementById("searchSong").value = "";
      document.getElementById("pZeroMatches").style.display = "none";
      this.showOrHideBanner("hide");
      for (let i = 0; i < this.songs.length; i++) {
        this.songs[i].Show = true;
      }
    },
    searchSong(value, showBannerObj = null, type = null) {
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

      if (showBannerObj) {
        this.showOrHideBanner("show", showBannerObj, type);
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
                  setTimeout(() => {
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
      // console.log("Playing random song...");
      let next = this.songs[Math.floor(Math.random() * this.songs.length)];
      this.playSong(next);
    },
    mute() {
      this.muteStatus = true;
      document.getElementById("volumeMute").style.display = "block";
      document.getElementById("volumeUp").style.display = "none";
      this.oldVol = document.getElementById("wavesurferVolume").value;
      document.getElementById("wavesurferVolume").value = 0;
      this.wavesurfer.setMute(true);
    },
    unmute() {
      this.muteStatus = false;
      document.getElementById("volumeMute").style.display = "none";
      document.getElementById("volumeUp").style.display = "block";
      document.getElementById("wavesurferVolume").value = this.oldVol;
      this.wavesurfer.setVolume((this.oldVol * this.oldVol) / 10000);
      this.wavesurfer.setMute(false);
    },
    minimizeMaximizePlayer(mode) {
      let self = this;
      if (mode == "min") {
        document
          .getElementById("divCenter")
          .classList.toggle("divCenterRetractedBottom");
        document.getElementById("divPlayerControls").style.display = "none";
        document.getElementById("divPlayerMinimize").style.display = "none";
        document.getElementById("divPlayerMaximize").style.display = "block";
        document.getElementById("divPlayerOptions").style.display = "none";
      } else if (
        mode ==
        "max" /*&& document.getElementById("divPlayerControls").style.display == "none"*/
      ) {
        document
          .getElementById("divCenter")
          .classList.toggle("divCenterRetractedBottom");
        document.getElementById("divPlayerMaximize").style.display = "none";

        setTimeout(() => {
          document.getElementById("divPlayerMinimize").style.display = "block";
          document.getElementById("divPlayerOptions").style.display = "block";
          // Scroll song pane into view if not visible. Needed because song pane might get hidden by the player controls wrapper sliding up.
          document
            .getElementById("play" + self.currentSong.SongID)
            .parentElement.scrollIntoViewIfNeeded();
        }, 1000);
        document.getElementById("divPlayerControls").style.display = "block";
        self.wavesurfer.drawBuffer();
      }
    },
    playLinkedSong() {
      const urlParams = new URLSearchParams(window.location.search);
      let songid = urlParams.get("songid");
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
        "&image=" +
        encodeURIComponent(song.SongImageURL);
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
    },
    subscribeToWavesurferInstance() {
      let self = this;
      console.log("Subscribed to Wavesurfer events");

      // Event for when song finishes
      this.wavesurfer.on("finish", () => {
        if (this.finished) return;

        document.title = "Fury Music";
        this.finished = true;
        self.elapsedPlaytime = self.currentSong.Length;
        document.getElementById(
          "play" + self.currentSong.SongID
        ).style.display = "block";
        document.getElementById(
          "pause" + self.currentSong.SongID
        ).style.display = "none";
        document.getElementById(
          "running" + self.currentSong.SongID
        ).style.display = "none";
        document.getElementById("divPlay").style.display = "block";
        document.getElementById("divPause").style.display = "none";

        setTimeout(() => {
          if (!self.wavesurfer.isPlaying() && !self.loading) self.playNext();
        }, 3000);
      });

      // Event for waveform interaction
      this.wavesurfer.on("seek", () => {
        if (this.wavesurfer.isPlaying()) {
          this.wavesurfer.play();
        }
      });

      // Event for when wavesurfer audio plays
      // this.wavesurfer.on("play", () => {
      //   self.volumeFadeIn();
      // });

      // Event for when wavesurfer audio pauses
      // this.wavesurfer.on("pause", () => {
      //   self.volumeFadeOut();
      // });

      // Event that fires continuously during audio playback
      this.wavesurfer.on("audioprocess", progress => {
        let minutes = parseInt(progress / 60);
        let seconds = parseInt(progress - minutes * 60);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        self.elapsedPlaytime = minutes + ":" + seconds;
      });

      // Fires when a song is loading
      let runOnce = false;
      this.wavesurfer.on("loading", progress => {
        if (!runOnce) {
          document.title = "Fury Music";
          self.elapsedPlaytime = "0:00";
          self.wavesurfer.setMute(self.muteStatus);
          document.getElementById(
            "play" + self.currentSong.SongID
          ).style.display = "none";
          document.getElementById("divPlay").classList.toggle("disabled");
          document
            .getElementById("wavesurferVolume")
            .classList.toggle("disabled");
          document.getElementById("volumeMute").classList.toggle("disabled");
          document.getElementById("stepForwards").classList.toggle("disabled");
          if (
            !document
              .getElementById("stepBackwards")
              .classList.contains("disabled")
          ) {
            document
              .getElementById("stepBackwards")
              .classList.toggle("disabled");
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
        document.getElementById("songLoaderProgress").innerHTML =
          progress + "%";
      });

      // Fires when wavesurfer is ready
      this.wavesurfer.on("waveform-ready", () => {
        self.loading = false;
        this.finished = false;
        runOnce = false;
        document.getElementById("songLoader").style.display = "none";
        document.getElementById("divPlay").classList.toggle("disabled");
        document
          .getElementById("wavesurferVolume")
          .classList.toggle("disabled");
        document.getElementById("stepForwards").classList.toggle("disabled");
        if (self.historyIndex > 1) {
          document.getElementById("stepBackwards").classList.toggle("disabled");
        }
        document.getElementById("volumeMute").classList.toggle("disabled");
        document.getElementById("volumeUp").classList.toggle("disabled");
        // document.getElementById("play" + self.currentSong.SongID).style.display =
        //   "block";
        document.getElementById(
          "load" + self.currentSong.SongID
        ).style.display = "none";
        self.elapsedPlaytime = "0:00";
        self.wavePlayPauseToggle("play");
      });
    }
  },
  watch: {
    loggedIn: function() {
      console.log("Fetching all tracks...");
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
    // Controls volume slider and saving of value
    let volumeSlider = document.getElementById("wavesurferVolume");
    if (localStorage.getItem("volume")) {
      volumeSlider.value = localStorage.getItem("volume");
    }
    volumeSlider.oninput = () => {
      let vol = (volumeSlider.value * volumeSlider.value) / 10000;
      this.wavesurfer.setVolume(vol);
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

    // Event for when space bar is pressed, mutes or plays track
    document.addEventListener("keydown", key => {
      if (this.currentSong.SongID == "" || this.$store.state.overlayed) return; // If no song is active, do nothing

      if (key.code == "Space" && this.wavesurfer.isPlaying()) {
        key.preventDefault();
        this.wavePlayPauseToggle("pause");
      } else if (key.code == "Space" && !this.wavesurfer.isPlaying()) {
        this.wavePlayPauseToggle("play");
      }
    });
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
  height: 38px;
  width: 38px;
  right: 0;
}

#customBackgroundImagePanel {
  position: fixed;
  right: 10px;
  bottom: 170px;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
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
  background-color: rgba(0, 0, 0, 0.3);
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
  transition: 0.2s;
}

.fontSongPane:hover {
  color: black;
  filter: none;
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

.divCenterHeader {
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

.divCenterHeaderRetracted {
  top: 231px;
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
  height: 18px;
  margin-top: 15px;
  margin-left: 15px;
}

#divSongPane:hover {
  background-color: white !important;
  color: black !important;
}

.divSongPaneSelected {
  background-color: white !important;
  color: black !important;
}

.runningSongIcon {
  display: none;
  width: 20px;
}

font-awesome-icon {
  background-color: transparent !important;
}

#pSidebarTitle {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  filter: drop-shadow(3px 3px 2px #000000);
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
  background-color: rgba(0, 0, 0, 0.8);
  height: 27px;
  left: 171px;
  right: 0;
  /* box-shadow: 0 4px 2px -2px gray; */
  z-index: 1;
  padding: 2px;
  text-align: left;
}

#divBanner {
  position: absolute;
  display: none;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  left: 171px;
  right: 0;
  top: 31px;
  height: 200px;
}

#imgBannerImage {
  box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.75);
  margin-left: 25px;
  width: 150px;
  max-height: 150px;
}

#divBannerInfoWrapper {
  margin-left: 25px;
}

#spanBannerHeader {
  position: absolute;
  color: white;
  font-size: 55px;
  top: 55px;
}

#spanBannerDesc {
  position: absolute;
  color: white;
  font-size: 20px;
  top: 120px;
}

#logo {
  margin-top: 35px;
  margin-bottom: 45px;
  width: 115px;
  cursor: pointer;
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
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  height: 130px;
  margin-left: 171px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

#stepForwards {
  padding: 4px;
  margin-left: 15px;
  margin-top: 25px;
  color: white;
  font-size: 17px;
  cursor: pointer;
}

#stepBackwards {
  padding: 4px;
  margin-right: 15px;
  margin-top: 25px;
  color: white;
  font-size: 17px;
  cursor: pointer;
}

#stepForwards:hover,
#stepBackwards:hover {
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
}

#canvasVisualizer {
  position: absolute;
  bottom: 0;
  width: inherit;
  height: 70px;
}

#songLoader {
  display: none;
  position: absolute;
  color: white;
  font-size: 36px;
  bottom: 60px;
  z-index: 1;
}

/* Div used to position elements that need to be in the absolute center of screen */
#divAbsoluteCenter {
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

#btnNewPlaylist {
  width: inherit;
  background-color: transparent;
  border: none;
  color: grey;
  padding: 10px;
  font-family: "Monsterrat", sans-serif;
  transition: 0.3s;
}

#btnNewPlaylist:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.15);
}

#divPlaylists {
  width: inherit;
  /* border: 1px solid red;  */
  height: calc(100% - 580px);
}

.divCenter {
  position: absolute;
  left: 170px;
  right: 0px;
  bottom: 105px;
  top: 62px;
  padding-bottom: 10px;
  z-index: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.divCenterRetractedBottom {
  bottom: 210px;
}

.divCenterRetractedTop {
  top: 260px;
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
  overflow: hidden;
}

#divControlsWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
}

.two-line {
  overflow-wrap: break-word;
}

#divPlayerMinimize {
  display: none;
  position: absolute;
  right: 0;
  text-align: center;
  bottom: 130px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 5px;
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
  background-color: rgba(0, 0, 0, 0.6);
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
  color: grey;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s;
}

.sidebarTitle:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

#pSidebarArtist {
  filter: drop-shadow(3px 3px 2px #000000);
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
  background-color: white;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  border: none;
  cursor: pointer;
}

#divPause {
  background-color: white;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  border: none;
  display: none;
  cursor: pointer;
}

#btnSignOut:hover {
  background-color: rgb(185, 32, 32);
}

#divPlayerWrapper {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
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
