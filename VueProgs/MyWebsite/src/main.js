import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'

// Add Font Awesome icon to library
library.add(faShareNodes)

// Create the Vue app
const app = createApp(App)

// Use router
app.use(router)

// Mount the app to the DOM
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
