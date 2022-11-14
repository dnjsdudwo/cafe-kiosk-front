import {defineStore} from "pinia";
import {reactive} from "vue";

export const useItemStore = defineStore('order',() => {

    const orderList = reactive([{
        name:'',
        shot:'',
        milk:'',
        ice:'',
        tumbler:'',
        price:0,
        count:1,
        type:''
    }]);

    return{
        orderList
    }
});