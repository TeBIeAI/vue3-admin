import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from './plugins/elementUI'
import router from './router'

import 'styles/index.scss'

const app = createApp(App)

app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

app.use(ElementUI).use(router)
app.mount('#app')
