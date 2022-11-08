<template>
  <div>
    <input type="text" v-model="userId" />
    <input type="password" v-model="password" />
    <button @click="join()">회원가입</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const userId = ref("");
const password = ref("");

const join = async () => {
  const params = {
    userId: userId.value,
    password: password.value,
  };

  await axios.post("/api/join", params);
  await router.push("/login");
};
</script>
