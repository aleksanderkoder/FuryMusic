import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser,faLock,faUserSecret,faAt,faPlay,faPause,faTimesCircle,faUserCircle,faPlus,faSpinner,faImage,faSortDown,faSearch,faTimes} from '@fortawesome/free-solid-svg-icons'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showLogIn: true,
    showPlayer: false,
    showRegUser: false,
    showUploadSong: false,
    showCustomImagePanel: false,
    username: "",
  },
  mutations: {
    showPlayer (state) {
      state.showPlayer = true 
      state.showLogIn = false
    },
    showSignIn (state) {
      state.showLogIn = true 
      state.showRegUser = false
      state.showPlayer = false
    },
    showSignUp (state) {
      state.showRegUser = true
      state.showLogIn = false 
    },
    showUploadSong (state) {
      state.showUploadSong = true
    },
    updateUsername (state, inUsername) {
      state.username = inUsername
    },

  }
})

library.add(faUser,faLock,faUserSecret,faAt,faPlay,faPause,faTimesCircle,faUserCircle,faPlus,faSpinner,faImage,faSortDown,faSearch,faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
