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

import {reactive, ref} from "vue";
import axios from "axios";


const login = reactive({
	mberId: '',
	pw: ''
})

let token = ref();

const loginClick = async () => {
	
	const response = await axios.post('/api/login', login)
	
	token.value = response.data
}

const getDate = async () => {
	const response = await axios.post('/api/curDate', null, {
		headers: {
			Authorization: 'Bearer ' + token.value
		}
	})
	
	console.log(response.data)
}


</script>
