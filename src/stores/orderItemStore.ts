import {defineStore} from "pinia";
import {reactive} from "vue";

export const useItemStore = defineStore('order',() => {

    type list = [{
        name:string,
        shot:string,
        milk:string,
        ice:string,
        tumbler:string,
        price:number,
        count:number,
        type:string,
    }]

    const coffees = reactive([{
        name:String,
        price:Number,
        img_url:String,
        isMilk:Boolean,
        isIce:Boolean,
        description:String,
        type:String
    }])

    const drinks = reactive([{
        name:String,
        price:Number,
        img_url:String,
        isMilk:Boolean,
        isIce:Boolean,
        description:String,
        type:String
    }])

    const orderList:list = reactive([{
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