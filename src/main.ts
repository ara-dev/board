import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import './assets/css/ant-rtl.less' // override ant css for rtl and customize
//Less - CSS Config
import './assets/css/main.less'
import router from './router'

// @ts-ignore
const app = createApp(App)

app.use(router)
app.use(MotionPlugin)

// Install - icon park
//install(app) // use default prefix 'icon', eg: icon is People, name is icon-people.

/* Store */
/*import {stage} from './core/index';*/
/*import element from './env/config.json';
const uiStore = new ui(element);*/
/*import { uiStore } from './core/index'*/
/*const =*/
/*stageStore.uiStore=uiStore;*/
/*app.provide('uiStore', uiStore);*/
/*app.provide('stageStore',stageStore);*/

app.mount('#app')
