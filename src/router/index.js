import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Layout,
		redirect: '/index',
		children: [
			{
				path: '/index',
				name: 'index',
				component: () => import('views/index/index.vue'),
				meta: {
					title: 'home',
				},
			},
		],
	},
]

const asyncRouterMap = [
	{
		path: '/user',
		component: Layout,
		name: 'user',
		meta: {
			title: '用户管理',
		},
		children: [
			{
				path: '/user/list',
				name: 'userlist',
				meta: {
					title: '用户列表',
				},
				component: () => import('views/user/index.vue'),
			},
		],
	},
]

const router = createRouter({
	routes: [...routes, ...asyncRouterMap],
	history: createWebHashHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
})

export default router
