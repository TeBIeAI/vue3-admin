import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes = [
	{
		path: '/',
		name: 'root',
		component: Layout,
		redirect: '/index',
		meta: {},
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
		path: '/system',
		component: Layout,
		name: 'system',
		meta: {
			title: 'system',
		},
		children: [
			{
				path: '/system/user',
				name: 'user',
				meta: {
					title: 'user',
				},
				component: () => import('views/system/user/index.vue'),
			},
			{
				path: '/system/role',
				name: 'role',
				meta: {
					title: 'role',
				},
				component: () => import('views/system/role/index.vue'),
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
