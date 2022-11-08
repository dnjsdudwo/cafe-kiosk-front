<template>
	<div class="text-center" v-if="isView">
		
		<v-overlay v-model="overlay" class="align-center justify-center">
			<v-progress-circular color="indigo-darken-2" indeterminate></v-progress-circular>
		</v-overlay>
	</div>
</template>

<script setup>


const overlay = (val) => {
	val && setTimeout(() => {
	}, 2000)
}

const props = defineProps({
	isView: {
		default: false
	}
})

</script>
