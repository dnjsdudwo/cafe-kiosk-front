import {defineStore} from "pinia";
import {reactive} from "vue";

export const useModalStore = defineStore("modalStore", () => {

    let show_modal = reactive({modal:false});

    let add_list = reactive({modal:false});

    let upd_list = reactive({modal:false});

    return {show_modal, add_list, upd_list};
})