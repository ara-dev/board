import {createApp} from 'vue'
// @ts-ignore
import App from './App.vue'
import {install} from '@icon-park/vue-next/es/all';
import './assets/css/ant-rtl.less'; // override ant css for rtl and customize
//Less - CSS Config
import './assets/css/main.less';
// @ts-ignore
const app = createApp(App);
// Install
install(app); // use default prefix 'icon', eg: icon is People, name is icon-people.
/* Store */
import {ui,stage} from './core/index';
import element from './env/config.json';
const uiStore = new ui(element);
const stageStore=new stage();
app.provide('uiStore', uiStore);
app.provide('stageStore',stageStore);

app.mount('#app')
