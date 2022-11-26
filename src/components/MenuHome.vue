<template>
	<LoadingProgress :isView="isView"></LoadingProgress>
	<CustomAlert></CustomAlert>
	<div>
    <div>
      <input @keyup.enter="login" type="text" placeholder="Id" v-model="userId" >
      <input @keyup.enter="login" type="password" placeholder="password" v-model="userPassword" >
      <button @click="login">로그인</button>
    </div>
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
import {axiosLogin} from "@/api/axiosLogin";

const useStore = useModalStore();
const { show_success_modal } = toRefs(useStore);

const isView = ref(false);
const tes  = ref("");

const userId = ref("");
const userPassword = ref("");

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

const login = () => {
  try {
    axiosLogin(userId.value,userPassword.value);
  }
  catch (e) {
    console.log(e)
  }
}

</script>
