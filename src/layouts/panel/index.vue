<template>
	<div class="app-panel">
		<div
			:class="[state.drawer ? 'open-panel' : 'close-panel', 'right-container']"
		>
			<div class="setting-menu" @click="togglePanel">
				<i class="el-icon-s-tools"></i>
			</div>
			<div class="panel-right">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
	drawer: true,
	direction: 'rtl',
})
const togglePanel = () => {
	state.drawer = !state.drawer
}
</script>

<style scoped lang="scss">
.app-panel {
	position: absolute;
	height: 100%;
	right: 0;
	background: rgba(0, 0, 0, 0.5);

	.setting-menu {
		position: absolute;
		width: fit-content;
		left: -33px;
		top: 35%;
		background: #409eff;
		padding: 4px;
		&:hover {
			cursor: pointer;
		}

		i {
			color: #fff;
			font-size: 25px;
		}
	}
	.right-container {
		position: absolute;
		right: 0;
		border-left: 1px solid #efefef;
		height: 100%;
		background: #fff;
		transition: all 0.2s linear;

		.panel-right {
			box-sizing: border-box;
			width: 250px;
		}
	}
	.open-panel {
		right: -250px;
	}
	.close-panel {
		right: 0;
	}
}
</style>
