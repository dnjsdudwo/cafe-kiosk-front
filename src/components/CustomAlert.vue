<template>
	<v-alert v-if="isView" class="justify-md-space-between"
	         style="margin-left: 800px"
	         :text="content" :type="level"
	         :max-width="300"></v-alert>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
	content: {
		default: ''
	},
	level: {
		default: 'success'
	}
})


const isView = ref(false)

const show = () => {
	isView.value = true
	setTimeout(() => {
		isView.value = false
	}, 1000)
}

defineExpose({
	show
})
</script>
