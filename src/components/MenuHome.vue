<template>
	<LoadingProgress :isView="isView"></LoadingProgress>
	<CustomAlert></CustomAlert>
	<div>
			<v-container>
				<h1>Event</h1>
				<v-divider></v-divider>
				<v-row no-gutters>
					<v-col
							v-for="n in 1"
							:key="n"
							cols="10"
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
											New
										</div>
										<div class="text-h6 mb-1">
											딸기스무디
										</div>
										<div class="text-caption">$3,500</div>
									</div>
								</v-card-item>
								
								<v-card-actions>
									<v-btn variant="outlined"
									       @click="testLoading()">
										BUY
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
import axios from "axios";

const isView = ref(false);
const tes  = ref("");

const test = reactive({
	test1: 1,
	test2: 3
})

// const menu = reactive({
//   {nm:'Espresso',memo:'아주아주 맛있어요'},
//   {nm:'Coffee',memo:'커피맛집'}
// })


const testLoading = async () => {
  const result = await axios.post("/api/coffee",{test : "커핑"},)
  alert(result);
  //await this.axios.post('/coffee');
	// isView.value = true;
  //await alert();
}

</script>
