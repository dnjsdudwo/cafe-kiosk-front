import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useModalStore = defineStore('modalStore',() => {

    const openOrderDetail_popup = ref(false);

    const orderDrink:object = reactive({});

    return {
        openOrderDetail_popup, orderDrink
    }
});
