<template>
	<div class="tag-wrapper">
		<div
			:class="['tag-item', currentRoute === item.path ? 'activeRoute' : '']"
			v-for="item in tags"
			:key="item.path"
			type="info"
			effect="dark"
			closable
		>
			<router-link :to="item.path">
				{{ $t(item.meta.title) }}
			</router-link>
			<i @click="deleteRoutesTags(item.path)" class="el-icon-close"></i>
		</div>
	</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import useDynamicTagRouter from './tagRouteHoos'
import { computed, defineComponent, watchEffect } from 'vue'

export default defineComponent({
	setup() {
		const router = useRouter()
		const route = useRoute()
		const { tags, deleteRoutesTags } = useDynamicTagRouter()

		const stop = watchEffect(() => {
			const path = route.path
		})
		// stop()

		return {
			tags,
			currentRoute: computed(() => route.path),
			deleteRoutesTags,
		}
	},
})
</script>

<style scoped lang="scss">
.tag-wrapper {
	margin: 5px 0;
	background: #fff;
	padding: 10px 15px;
	display: flex;
	box-sizing: border-box;

	.tag-item {
		font-size: 14px;
		color: #666;
		margin-right: 10px;
		padding: 5px;
		border-radius: 2px;

		&:hover {
			cursor: pointer;
		}
	}

	.activeRoute {
		background: #1890ff;
		color: #fff;
	}
}
</style>
