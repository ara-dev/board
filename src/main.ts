import {createApp} from 'vue'
// @ts-ignore
import App from './App.vue'
//Ant Design Config
/*import Antd from 'ant-design-vue';*/
/*import 'ant-design-vue/dist/antd.less'*/ // or "ant-design-vue/dist/antd.css";
import './assets/css/ant-rtl.less'; // override ant css for rtl and customize
//Less - CSS Config
import './assets/css/main.less';
const app = createApp(App);
//app.config.productionTip = false;
/* Store */
import {ui} from './core/index';
import element from './env/config.json';
const uiStore = new ui(element);
app.provide('uiStore', uiStore);
//use Ant
/*app.use(Antd);*/

/*import {IconPark,Home} from '@icon-park/vue-next/es/all';
app.component('icon',{
    IconPark
})
app.use(Home);*/

app.mount('#app')
