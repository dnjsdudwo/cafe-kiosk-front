<template>
	<LoadingProgress :isView="isView"></LoadingProgress>
	<CustomAlert></CustomAlert>
	<div>
			<v-container>
				<h1>Event</h1>
				<v-divider></v-divider>
				<v-row no-gutters>
					<v-col
							v-for="n in 6"
							:key="n"
							cols="12"
							sm="4"
					>
						<v-sheet class="ma-2 pa-2">
							<v-card
									class="mx-auto"
									max-width="400"
									variant="outlined"
							>
								<v-card-item>
									<div>
										<div class="text-overline mb-1">
											OVERLINE
										</div>
										<div class="text-h6 mb-1">
											Headline
										</div>
										<div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
									</div>
								</v-card-item>
								
								<v-card-actions>
									<v-btn variant="outlined"
									       @click="testLoading()">
										장바구니
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
	</div>
	
</template>

<script setup>
import {reactive, ref} from "vue";
import LoadingProgress from "./LoadingProgress.vue"
import CustomAlert from '@/components/CustomAlert.vue'

const isView = ref(false);
const tes  = ref("");

const test = reactive({
	test1: 1,
	test2: 3
})

const testInput = () => {
	console.log(tes.value)
}

const testLoading = async () => {
	
	// isView.value = true;
	await alert("상품이 추가되었습니다");
}
</script>
