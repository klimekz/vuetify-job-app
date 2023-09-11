import { createApp } from 'vue'
import './style.css'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import App from './App.vue'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css"
import {aliases, mdi} from "vuetify/iconsets/mdi"

const vuetify = createVuetify({
    components, 
    directives,
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {mdi}
    }
    
})
createApp(App).use(vuetify).mount('#app')
