/**
 * @description 路由守卫配置
 */
import router from '@/router'
import NProgress from 'nprogress'
import { getStorage } from 'utils'
import('nprogress/nprogress.css')
import store from '@/store'

import { user_info } from 'api'

NProgress.configure({
	easing: 'ease',
	speed: 500,
	trickleSpeed: 200,
})

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
	NProgress.start()
	const token = getStorage('hc-token')
	if (token) {
		if (to.path === '/login') {
			next('/')
			NProgress.done()
		} else {
			if (!store.getters.userInfo.username) {
				const res = await user_info({ token })
				store.commit('SET_USERINFO', res)
				next({ ...to, replace: true })
			} else {
				next()
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			// 点击退出时,会定位到这里
			next()
		} else {
			next('/login')
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})
