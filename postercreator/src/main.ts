import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eleInstall from './lib/elementUI'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import inputNumber from './components/inputNumber/inputNumber.vue'
import { TinyEmitter } from 'tiny-emitter'

const app = createApp(App)
eleInstall(app)
app.config.globalProperties.$emitter = new TinyEmitter();
app.component(inputNumber.name, inputNumber)
app.use(store).use(router).mount('#app')
