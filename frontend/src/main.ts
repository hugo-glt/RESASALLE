import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import router from './router'

const app = createApp(App)
app.use(router)
app.use(VCalendar, {})
app.mount('#app')


