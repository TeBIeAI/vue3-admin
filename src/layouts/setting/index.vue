<template>
	<Panel>
		<div class="setting-wrapper">
			<el-divider content-position="center">模式切换</el-divider>
			<el-radio-group @change="handlChangeTheme" v-model="themeModel">
				<el-radio-button label="grey">灰色模式</el-radio-button>
				<el-radio-button label="weakness">色弱模式</el-radio-button>
				<el-radio-button label="">重置</el-radio-button>
			</el-radio-group>
		</div>
	</Panel>
</template>

<script>
import Panel from '../panel/index.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { setStorage, getStorage } from 'utils/index'

export default defineComponent({
	components: {
		Panel,
	},
	setup() {
		const themeModel = ref('')
		const theme = {
			grey: 'html-grey',
			weakness: 'html-weakness',
		}

		const handlChangeTheme = themName => {
			const themeValue = theme[themName] || ''
			const body = document.querySelector('body')
			body.className = themeValue
			setStorage('themeName', themName)
		}

		onMounted(() => {
			const themeName = getStorage('themeName')
			handlChangeTheme(themeName)
			themeModel.value = themeName
		})

		return {
			themeModel,
			handlChangeTheme,
		}
	},
})
</script>

<style lang="scss" scoped>
.setting-wrapper {
	padding: 15px;
}
</style>
