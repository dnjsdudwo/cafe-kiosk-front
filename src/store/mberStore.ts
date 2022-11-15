import { defineStore } from "pinia";
import { ref } from "vue";

export const mberStore = defineStore("mberStore", () => {
  const token = ref("");
  const userId = ref("");

  return { token, userId };
});
