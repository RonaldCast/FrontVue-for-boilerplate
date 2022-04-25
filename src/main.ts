

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Ajax from './lib/ajax';
import Util from './lib/util';
import "./assets/index.css"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);



if(!Util.abp.utils.getCookieValue('Abp.Localization.CultureName')){
    let language=navigator.language;
    Util.abp.utils.setCookieValue('Abp.Localization.CultureName',language,new Date(new Date().getTime() + 5 * 365 * 86400000),abp.appPath);
  }
  
Ajax.get('/AbpUserConfiguration/GetAll').then(data=>{
    Util.abp=Util.extend(true,Util.abp,data.data.result);
    app.mount("#app");
})


