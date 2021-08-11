// import Vue from 'vue'
import axios from 'axios'

// Vue.prototype.$axios = axios
export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: '127.0.0.1:9000'
  })
}



// import Vue from 'vue'
// import axios from 'axios'

// Vue.prototype.$axios = axios
