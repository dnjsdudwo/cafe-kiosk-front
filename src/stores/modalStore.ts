import {defineStore} from "pinia";
import {ref} from "vue";

export const useModalStore = defineStore('modal',() => {

    const show_modal = ref(false)
    const show_success_modal = ref(false)
    const show_fail_modal = ref(false)
    const show_detail_modal = ref(false)

    return {
        show_modal,
        show_success_modal,
        show_detail_modal,
        show_fail_modal
    }
});
