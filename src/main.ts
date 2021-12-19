import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/ant-rtl.less' // override ant css for rtl and customize
//Less - CSS Config
import './assets/css/main.less'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(MotionPlugin)

app.mount('#app')
