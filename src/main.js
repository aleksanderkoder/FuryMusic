import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser,faLock,faUserSecret,faAt,faPlay,faPause,faTimesCircle,faUserCircle} from '@fortawesome/free-solid-svg-icons'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showLogIn: true,
    showPlayer: false,
    showRegUser: false,
    username: "hei"
  },
  mutations: {
    showPlayer (state) {
      state.showPlayer = true 
      state.showLogIn = false
      state.showRegUser = false
    },
    showLogIn (state) {
      state.showLogIn = true 
      state.showRegUser = false
      state.showPlayer = false
    },
    showRegUser (state) {
      state.showRegUser = true
      state.showPlayer = false
      state.showLogIn = false 
    },
    updateUsername (state, inUsername) {
      state.username = inUsername
    }
  }
})

library.add(faUser,faLock,faUserSecret,faAt,faPlay,faPause,faTimesCircle,faUserCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
