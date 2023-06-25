import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import Pt3Form from './../packages/lib/form/index'
// import Pt3Btn from './../packages/lib/button/index'
// import Pt3Table from './../packages/lib/table/index'
import 'pt3-ui/dist/css/index.css'
import pt3UI from 'pt3-ui'
// import pt3UI from '../packages/index'
import router from './src/router/index'
createApp(App).use(ElementPlus).use(pt3UI).use(router).mount('#app')
