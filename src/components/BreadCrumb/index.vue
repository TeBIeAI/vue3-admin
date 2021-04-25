<template>
	<el-breadcrumb separator="/">
		<transition-group name="breadcrumb" appear>
			<el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
				<span v-if="index == breadList.length - 1" style="color: #999">
					{{ $t(item.meta.title) }}
				</span>
				<a v-else @click="router.push(item.path)">
					{{ $t(item.meta.title) }}
				</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	setup() {
		const router = useRouter()
		const route = useRoute()
		const breadList = ref([])

		const getBreadCrumb = () => {
			let matched = route.matched.filter(r => r.meta && r.meta.title)
			if (matched[0].name !== 'index') {
				matched = [
					{
						path: '/index',
						meta: {
							title: 'home',
						},
					},
				].concat(matched)
			}
			breadList.value = matched
		}

		onMounted(() => {
			getBreadCrumb()
		})

		watch(
			() => route.matched,
			() => getBreadCrumb()
		)

		return {
			breadList,
			router,
		}
	},
})
</script>

<style scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
	transition: all 0.3s linear;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(20px);
}

.breadcrumb-leave-active {
	position: absolute;
}
</style>
