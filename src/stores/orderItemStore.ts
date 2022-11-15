import {defineStore} from "pinia";
import {reactive} from "vue";

export const useItemStore = defineStore('order',() => {


    const coffees = reactive([{
        name:String,
        price:Number,
        isMilk:Boolean,
        isIce:Boolean,
        description:String,
        type:String
    }])

    const drinks = reactive([{
        name:String,
        price:Number,
        isMilk:Boolean,
        isIce:Boolean,
        description:String,
        type:String
    }])

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
        orderList,coffees,drinks
    }
});