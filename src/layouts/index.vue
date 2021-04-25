<template>
	<el-container style="height: 100%">
		<!-- 侧边栏 -->
		<Aside />
		<el-container class="right-wrapper">
			<!-- 右侧 header -->
			<Header />
			<router-tag></router-tag>
			<!-- 主体app -->
			<AppMan />
			<el-footer>Footer</el-footer>
		</el-container>
		<!-- 配置主题色 -->
		<Setting />
	</el-container>
</template>

<script setup>
import Aside from './aside/index.vue'
import Header from './header/index.vue'
import Setting from './setting/index.vue'
import AppMan from './appMan.vue'
import RouterTag from './tag/index.vue'
</script>

<style scoped lang="scss">
.el-header,
.el-footer {
	background-color: #fff;
	color: #333;
	line-height: 60px;
}

.el-main {
	color: #333;
	line-height: 160px;
}

body > .el-container {
	margin-bottom: 40px;
}

.right-wrapper {
	background: #e9eef3 !important;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>
