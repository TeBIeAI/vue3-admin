<template>
	<section class="el-main">
		<router-view class="router-view" v-slot="{ Component }">
			<transition appear name="fade-transform" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</section>
</template>

<script>
export default {}
</script>

<style>
/* fade */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.5s;
}

.fade-transform-enter-from {
	opacity: 0;
	transform: translateX(-30px);
}

.fade-transform-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
