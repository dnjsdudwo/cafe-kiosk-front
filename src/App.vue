<template>
	<v-layout>
		<v-main>
			<v-tabs
					fixed-tabs
					bg-color="blue-grey"
			>
				<v-tab @click="goMenu('/')">
					Home
				</v-tab>
				<v-tab @click="goMenu('/CoffeeAndEspresso')">
					Coffee & Espresso
				</v-tab>
				<v-tab @click="goMenu('/drink')">
					Drink
				</v-tab>
			</v-tabs>
			<v-card height="857px">
				<router-view></router-view>
			</v-card>
		</v-main>
	</v-layout>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"

const router = useRouter()

const goMenu = (menu: string) => {
	router.push(menu)
}

</script>
