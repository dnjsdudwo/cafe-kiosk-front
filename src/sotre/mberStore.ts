import { defineStore } from "pinia";
import {reactive, ref} from "vue";

export const useMberStore = defineStore("mberStore", () => {
  const menu: object[] = reactive([]);
  const userId = ref("");

  const addMenu = (param: object) => {
    menu.push(param)
    userId.value = 'dd';
  }

  return { menu, userId, addMenu };
});
