import {createApp} from 'vue'
import App from './App.vue'

//Ant Design Config
/*import Antd from 'ant-design-vue';*/
/*import 'ant-design-vue/dist/antd.less'*/ // or "ant-design-vue/dist/antd.css";
import './assets/css/ant-rtl.less'; // override ant css for rtl and customize
//Less - CSS Config
import './assets/css/main.less';

const app = createApp(App);
app.config.productionTip = false;

//use Ant
/*app.use(Antd);*/


app.mount('#app')
