import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import lazyPlugin from 'vue3-lazy'

const app = createApp(App)

app.use(router)
// 懒加载插件
app.use(lazyPlugin, {})
app.mount('#app')

// 挂载事件总线
app.config.globalProperties.$bus = new mitt()



// createApp(App).use(router).mount('#app')

// app.config.globalProperties.$bus = new mitt()