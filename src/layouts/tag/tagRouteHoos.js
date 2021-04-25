import { reactive, toRefs } from '@vue/reactivity'
import { useRouter, useRoute } from 'vue-router'

const dynamicTags = reactive({
	tags: [
		{
			path: '/index',
			meta: {
				title: 'home',
				icon: 'el-icon-s-home',
				showLink: true,
				savedPosition: false,
			},
		},
	],
})

const useDynamicTagRouter = () => {
	const router = useRouter()
	const route = useRoute()

	const dynamicRoutesTags = (path, parentPath) => {
		const hasPath = dynamicTags.tags.some(route => {
			return route.path == path
		})
		const mergePath = (routes = [], path, parentPath) => {
			!hasPath &&
				routes.forEach(route => {
					if (route.path === path) {
						dynamicTags.tags.push({ path: route.path, meta: route.meta })
					} else if (route.children && route.children.length) {
						mergePath(route.children, path, parentPath)
					}
				})
		}

		mergePath(router.options.routes, path, parentPath)
	}

	const deleteRoutesTags = path => {
		const findIndex = dynamicTags.tags.findIndex(r => r.path === path)
		findIndex && dynamicTags.tags.splice(findIndex, 1)
		// 如果删除的时当前激活的 就跳转至最后一位
		const current = route.path
		if (current === path) {
			const lastRoute = dynamicTags.tags[dynamicTags.tags.length - 1]
			router.push(lastRoute.path)
		}
	}

	return {
		...toRefs(dynamicTags),
		dynamicRoutesTags,
		deleteRoutesTags,
	}
}

export default useDynamicTagRouter
