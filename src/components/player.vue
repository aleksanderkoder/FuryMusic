<template>
<div id="divPlayerWrapper">

    <div id="divTopbar">


    </div>

    <div id="divSidebar">


    </div>

    <div id="divCenter">


    </div>

    <div id="divPlayerControls">


    </div>

</div>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {
      username: "",
      songs: {},
      apiURL: "https://furymusic.000webhostapp.com/Scripts/"
    }
  },
  methods: {

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


h1, h2 {
  font-weight: normal;
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
  color: #202225;
  font-size: 15px;
  font-family: 'Monsterrat', sans-serif;
}
</style>