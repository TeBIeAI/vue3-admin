<template>
	<el-aside width="200px">
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo">
			<sidebar-item
				v-for="route in routes"
				:key="route.path"
				:route="route"
				:path="route.path"
			/>
		</el-menu>
	</el-aside>
</template>
<script setup>
import { useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'
import { increaseIndexes } from 'utils/index.js'

const originRoutes = useRouter().options.routes
const routes = increaseIndexes(originRoutes)
</script>
