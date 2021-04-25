<template>
	<el-menu
		:default-active="activeMenu"
		:background-color="variables.menuBg"
		:text-color="variables.menuText"
		:active-text-color="variables.menuActiveText"
		class="el-menu-vertical-demo"
		@select="selectMenu"
		:collapse="collapse"
	>
		<sidebar-item
			v-for="route in routes"
			:key="route.path"
			:route="route"
			:path="route.path"
		/>
	</el-menu>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'
import { increaseIndexes } from 'utils/index.js'
import variables from 'styles/variables.module.scss'
import useDynamicTagRouter from '../tag/tagRouteHoos.js'
import { useStore } from 'vuex'

export default defineComponent({
	components: {
		sidebarItem,
	},
	setup() {
		const route = useRoute()
		const store = useStore()
		const originRoutes = useRouter().options.routes
		const routes = increaseIndexes(originRoutes)
		const { dynamicRoutesTags } = useDynamicTagRouter()

		const selectMenu = path => {
			let parentPath = ''
			const parentIndex = path.lastIndexOf('/')
			if (parentIndex > 0) {
				parentPath = path.slice(0, parentIndex)
				dynamicRoutesTags(path, parentPath)
			}
		}
		return {
			routes,
			variables,
			selectMenu,
			activeMenu: computed(() => route.path),
			collapse: computed(() => store.getters.sidebar.collapse),
		}
	},
})
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
}
</style>
