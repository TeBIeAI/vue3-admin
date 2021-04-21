<template>
	<el-breadcrumb separator="/">
		<transition-group name="breadcrumb" appear>
			<el-breadcrumb-item v-for="item in breadList" :key="item.path">
				{{ item.meta.title }}
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
			console.log(matched)
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
