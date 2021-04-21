<template>
	<div v-if="!route.hidden">
		<template v-if="hasOneOrNoChild(route.children, route)">
			<el-submenu :index="route.path">
				<template #title>
					<span>{{ route.meta.title }}</span>
				</template>
				<sidebar-item
					v-for="child in route.children"
					:key="child.key"
					:route="child"
					:path="child.path"
				/>
			</el-submenu>
		</template>
		<template v-else>
			<app-link :to="route.path">
				<el-menu-item :index="route.path">
					<template #title>{{ route.meta.title }}</template>
				</el-menu-item>
			</app-link>
		</template>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'
import appLink from './link.vue'

defineProps({
	path: String,
	route: Object,
})

const hasOneOrNoChild = (child, parent) => {
	console.log(child)
}
</script>
