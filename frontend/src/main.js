import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

axios.defaults.baseURL = 'http://127.0.0.1:3000';

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount('#app');
