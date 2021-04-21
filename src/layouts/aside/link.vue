<template>
	<component :is="type" v-bind="linkProps(to)">
		<slot />
	</component>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
	to: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'router-link',
	},
})
const linkProps = to => {
	return {
		to: to,
	}
}
</script>
