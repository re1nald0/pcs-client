// import Vue from 'vue'
import axios from 'axios'
import { LocalStorage } from 'quasar'

// Vue.prototype.$axios = axios
export default ({ Vue }) => {
  let url = ''
  if(LocalStorage.getItem('url') !== null && LocalStorage.getItem('url') !== undefined) {
    url = LocalStorage.getItem('url')
  } else {
    url = 'http://127.0.0.1:3000'
  }

  Vue.prototype.$axios = axios.create({
    baseURL: url
  })
}



// import Vue from 'vue'
// import axios from 'axios'

// Vue.prototype.$axios = axios
