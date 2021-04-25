/**
 * @description 路由守卫配置
 */
import router from '@/router'
import NProgress from 'nprogress'
import('nprogress/nprogress.css')

NProgress.configure({
	easing: 'ease',
	speed: 500,
	trickleSpeed: 200,
})

router.beforeEach((to, from, next) => {
	NProgress.start()
	next()
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})
