import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser,faLock,faUserSecret,faAt,faPlay,faPause} from '@fortawesome/free-solid-svg-icons'

library.add(faUser,faLock,faUserSecret,faAt,faPlay,faPause)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
