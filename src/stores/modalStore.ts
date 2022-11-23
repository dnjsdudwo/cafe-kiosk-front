import {defineStore} from "pinia";
import {reactive} from "vue";

export const useModalStore = defineStore("modalStore", () => {

    let show_modal = reactive({modal:false});

    return {show_modal};
})