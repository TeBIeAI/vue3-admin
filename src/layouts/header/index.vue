<template>
	<el-header class="nav-wrapper">
		<el-row>
			<el-col :span="8" class="nav-left">
				<i
					@click="handleTollageAside"
					:class="!collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
				></i>
				<BreadCrumb />
			</el-col>
			<el-col :offset="10" :span="6">
				<div @click="handleToggleLang"> {{ userinfo.username }} </div>
			</el-col>
		</el-row>
	</el-header>
</template>

<script>
import { computed, defineComponent } from 'vue'
import BreadCrumb from 'cps/BreadCrumb/index.vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

export default defineComponent({
	components: {
		BreadCrumb,
	},
	setup() {
		const { locale } = useI18n()
		const store = useStore()

		const handleToggleLang = () => {
			locale.value = 'en'
		}

		const handleTollageAside = () => {
			store.commit('SET_SIDEBAR')
		}
		return {
			handleToggleLang,
			collapse: computed(() => store.getters.sidebar.collapse),
			userinfo: computed(() => store.getters.userInfo),
			handleTollageAside,
		}
	},
})
</script>

<style lang="scss" scoped>
.nav-wrapper {
	.nav-left {
		display: flex;
		align-items: center;
		font-size: 19px;

		i {
			cursor: pointer;
			margin-right: 10px;
		}
	}
}
</style>
