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
										Button
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-sheet>
					</v-col>
				</v-row>
      </v-container>
    <div v-if="show_success_modal">
      <addItemModal/>
    </div>
	</div>
	
</template>

<script setup>
import {reactive, ref, toRefs} from "vue";
import LoadingProgress from "./LoadingProgress.vue"
import CustomAlert from '@/components/CustomAlert.vue'
import {createModal} from "@/components/modal/createNewModal";
import {useModalStore} from "@/stores/modalStore";

const useStore = useModalStore();
const { show_success_modal } = toRefs(useStore);

const isView = ref(false);
const tes  = ref("");

const test = reactive({
	test1: 1,
	test2: 3
})

const testInput = () => {
	console.log(tes.value)
}

const addItemModal = createModal('알림','상품을 추가하였습니다','');

const testLoading =  () => {
	// isView.value = true;
	 show_success_modal.value = true;
}
</script>
