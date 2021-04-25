import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from './plugins/elementUI'
import router from './router'
import { createI18n } from 'vue-i18n'
import 'utils/permission'

import 'styles/index.scss'
import ch from './locales/ch.json'
import en from './locales/en.json'

const app = createApp(App)
const i18n = createI18n({
	locale: 'ch', //默认使用中文
	messages: {
		ch,
		en,
	},
})

app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

app.use(ElementUI).use(store).use(router).use(i18n)
app.mount('#app')
