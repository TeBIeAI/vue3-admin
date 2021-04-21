<template>
	<div v-if="!route.hidden">
		<template
			v-if="
				hasOneOrNoChild(route.children, route) &&
				(!onlyOneChild.children || onlyOneChild.noShowingChildren)
			"
		>
			<app-link v-if="onlyOneChild.meta" :to="route.path">
				<el-menu-item :index="route.path">
					<template #title>{{ onlyOneChild.meta.title }}</template>
				</el-menu-item>
			</app-link>
		</template>
		<el-submenu v-else :index="route.path">
			<template #title>
				<span>{{ route.meta.title }}</span>
			</template>
			<sidebar-item
				v-for="child in route.children"
				:key="child.path"
				:route="child"
				:path="child.path"
			/>
		</el-submenu>
	</div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import appLink from './link.vue'

const props = defineProps({
	path: String,
	route: Object,
})

const onlyOneChild = ref({})

const hasOneOrNoChild = function (children = [], parent) {
	const showingChildren = children.filter(item => {
		if (item.hidden) {
			return false
		} else {
			onlyOneChild.value = item
			return true
		}
	})

	if (showingChildren.length === 1) {
		return true
	}

	if (showingChildren.length === 0) {
		onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
		return true
	}
	return false
}
</script>
