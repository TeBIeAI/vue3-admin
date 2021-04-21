<template>
	<el-container style="height: 100%">
		<Aside />
		<el-container>
			<Header />
			<el-main>
				<router-view></router-view>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</template>

<script setup>
import Aside from './aside/index.vue'
import Header from './header/index.vue'
</script>

<style scoped lang="scss">
.el-header,
.el-footer {
	background-color: #fff;
	color: #333;
	line-height: 60px;
}

.el-aside {
	background-color: #d3dce6;
	color: #333;
	line-height: 200px;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	line-height: 160px;
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>
