<template>
  <div>
	  <input type="text" v-model="login.mberId">
	  <input type="password" v-model="login.pw">
	  <button @click="loginClick()">login</button>
	  <br>
	  <button @click="getDate()">getDate</button>
  </div>
</template>

<script setup>

import {useCounterStore} from "@/stores/counter";
import {useMberStore} from "@/stores/mber";
import {storeToRefs} from "pinia";
import {getCurrentInstance, reactive, ref} from "vue";
import {useRouter} from "vue-router";

const { proxy } = getCurrentInstance();


const router = useRouter()
const mberStore = useMberStore()

let {token, refreshToken, mberSn} = storeToRefs(mberStore)

const login = reactive({
	mberId: '',
	pw: ''
})

const loginClick = async () => {
	const response = await proxy.$axios.post('/api/login', login)
	
	token.value = response.data.token
	refreshToken.value = response.data.refreshToken
	mberSn.value = response.data.mberSn
}

const getDate = async () => {
	const response = await proxy.$axios.post('/api/curDate', {test: 1})
	
	console.log(response.data)
}


</script>
