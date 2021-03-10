<template>
    <div class="animate__animated animate__fadeInDownBig" id="divCustomBackImgWrapper">
        <h1>Upload custom background image</h1>
        <label for="file" id="btnChooseImage">
          Select image 
        </label>
        <input id="file" type="file" accept=".jpg,.png,.gif" v-on:change="uploadImage()">
        <br />
        <img src="" id="imageShowcase" width="350px">
        <div id="divConfirm">
          <h2>Do you want to use this image?</h2>
          <button id="btnConfirmUpload" v-on:click="useImage()">Use this image</button>
        </div>
        <button id="btnCancel" v-on:click="cancel()">Cancel</button>
        <button id="btnRevert" v-on:click="revertToDefault()">Revert to default</button>
    </div>
</template>

<script>
export default {
  name: 'uploadBackImg',
  data () {
    return {
      objectURL: ""
    }
  },
  methods: {
    uploadImage () {
      let file = document.getElementById("file").files[0]
      if (file.type == "image/png" || file.type == "image/gif" || file.type == "image/jpeg")
      {
        this.objectURL = URL.createObjectURL(document.getElementById("file").files[0])
        document.getElementById("imageShowcase").src = this.objectURL
        document.getElementById("divConfirm").style.display = "block"
      }
      else
      {
        Ozone.fire("error", "Invalid file type selected", "bottom-middle")
      }
      
    },
    useImage () {
      const image = document.getElementById("file").files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.addEventListener("loadend", function () {
      try {
          localStorage.setItem("custom_background_image", reader.result)
          Ozone.fire("info", "Background image changed, please refresh!", "bottom-middle")
          URL.revokeObjectURL(this.objectURL)
          document.getElementById("divCustomBackImgWrapper").style.display = "none"
        }
        catch (e) {
          console.log("Error: " + e)
        }     
      })
    }, 
    revertToDefault () {
      localStorage.removeItem("custom_background_image")
      Ozone.fire("info", "Background image has been reverted to default!", "bottom-middle")
    }, 
    cancel () {
      this.$emit("hideCustomBackgroundImagePanel")
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

#btnConfirmUpload, #btnChooseImage {
  margin: 20px;
  background-color:#3c3e41af;
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
  color: white;
}

#btnCancel {
  bottom: 10px;
  margin: 20px;
  background-color:#8b0000;
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

#btnRevert:hover {
  text-decoration: underline;
}

#imageShowcase {
  margin-top: 35px;
}

#divCustomBackImgWrapper {
  position: absolute;
  width: 600px;
  min-height: 450px; 
  margin-left: auto;
  margin-right: auto; 
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.85); 
  margin-top: 8%;
  border-radius: 1%; 
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Wals";
  z-index: 9999;
}

#divConfirm {
  display: none; 
}

input[type="file"] {
  display: none;
}

button {
  cursor: pointer;
}

h1, h2 {
  font-weight: normal;
  color: white;
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
