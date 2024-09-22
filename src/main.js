import './assets/main.css'
import '../node_modules/mdb-ui-kit/css/mdb.min.css'
import '../node_modules/mdb-ui-kit/js/mdb.es.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import '../node_modules/sweetalert2/dist/sweetalert2.min.js'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
