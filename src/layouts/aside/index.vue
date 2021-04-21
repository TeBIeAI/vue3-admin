<template>
	<el-aside width="200px">
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo">
			<sidebar-item
				v-for="route in originRoutes"
				:key="route.path"
				:path="route.path"
				:route="route"
			/>
		</el-menu>
	</el-aside>
</template>
<script setup>
import { useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'

const originRoutes = useRouter().options.routes
const filterRouters = routes => {
	return routes.filter(r => r.meta)
}
const routes = filterRouters(originRoutes)
</script>
