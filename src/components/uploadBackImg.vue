<template>
  <div
    id="background"
    v-on:click.self="$store.commit('hideCustomImageComponent')"
    class="animate__animated animate__fadeIn"
  >
    <div
      class="animate__animated animate__fadeInDownBig"
      id="divCustomBackImgWrapper"
    >
      <font-awesome-icon
        style="font-size: 25px; position: fixed; right: 25px; top: 15px; cursor: pointer;"
        :icon="['fas', 'times']"
        v-on:click="$store.commit('hideCustomImageComponent')"
      />
      <h1>Upload background image</h1>
      <label for="file" id="btnChooseImage"> Select image </label>
      <input
        id="file"
        type="file"
        accept=".jpg,.png,.gif"
        v-on:change="uploadImage()"
      />
      <br />
      <img src="" id="imageShowcase" width="350px" />
      <div v-show="showConfirm">
        <h2>Do you want to use this image?</h2>
        <button id="btnConfirmUpload" v-on:click="useImage()">
          Use this image
        </button>
      </div>
      <button id="btnRevert" v-on:click="revertToDefault()">
        Revert to default
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadBackImg",
  data() {
    return {
      objectURL: "",
      showConfirm: false
    };
  },
  methods: {
    uploadImage() {
      let file = document.getElementById("file").files[0];
      if (
        file.type == "image/png" ||
        file.type == "image/gif" ||
        file.type == "image/jpeg"
      ) {
        this.objectURL = URL.createObjectURL(
          document.getElementById("file").files[0]
        );
        document.getElementById("imageShowcase").src = this.objectURL;
        this.showConfirm = true;
      } else {
        Ozone.fire("error", "Invalid file type selected", "bottom-middle");
      }
    },
    useImage() {
      let self = this;
      const image = document.getElementById("file").files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("loadend", function() {
        try {
          localStorage.setItem("custom_background_image", reader.result);
          Ozone.fire("info", "Background image changed", "bottom-middle");
          URL.revokeObjectURL(this.objectURL);
          document.getElementById("imageShowcase").src = "";
          self.showConfirm = false;
          self.$store.commit("hideCustomImageComponent");
          setTimeout(() => {
            location.reload();
          }, 3000);
        } catch (e) {
          console.log("Error: " + e);
          Ozone.fire("error", "Image file size is too large", "bottom-middle");
        }
      });
    },
    revertToDefault() {
      localStorage.removeItem("custom_background_image");
      document.getElementById("imageShowcase").src = "";
      Ozone.fire(
        "info",
        "Background image has been reverted to default",
        "bottom-middle"
      );
      this.$store.commit('hideCustomImageComponent'); 
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }
};
</script>

<style scoped>
#btnConfirmUpload,
#btnChooseImage {
  margin: 20px;
  background-color: #000000;
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

#btnChooseImage:hover {
  background-color: #202225;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#btnConfirmUpload:hover {
  background-color: #107421;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#btnRevert {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  color: black;
}

#btnRevert:hover {
  text-decoration: underline;
}

#imageShowcase {
  margin-top: 35px;
}

#divCustomBackImgWrapper {
  width: 600px;
  min-height: 450px;
  max-height: 60%;
  overflow-y: auto;
  margin: 0 auto;
  left: 0;
  right: 0;
  text-align: center;
  background-color: white;
  border-radius: 1%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Wals";
  z-index: 999999999;
}

#divConfirm {
  display: none;
}

#background {
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 999;
}

input[type="file"] {
  display: none;
}

button {
  cursor: pointer;
}

h1,
h2 {
  font-weight: normal;
  color: black;
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
