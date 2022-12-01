import { defineStore } from "pinia";
import { ref } from "vue";

export const useMberStore = defineStore("mber", () => {
  const token = ref("");
  const refreshToken = ref("");
  const mberSn = ref("");

  return { token, mberSn, refreshToken };
});
