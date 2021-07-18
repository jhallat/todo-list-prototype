import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSync, faHashtag, faCheckSquare, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle, faSquare, faClock, faEdit, faCalendarAlt, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSync,
            faHashtag,
            faTimesCircle,
            faCheckSquare,
            faSquare,
            faClock,
            faEdit,
            faCalendarAlt,
            faPlayCircle,
            faPlusCircle,
            faMinusCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
