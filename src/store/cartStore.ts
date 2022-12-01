import { defineStore } from "pinia";
import {ref, computed, reactive} from "vue";


type useOrderType = {
   name : String,
   price : number,
   size : String,
   takeOutAt : Boolean,
   cnt : number
}
export const useCartStore = defineStore("cartStore", ()=>{
   const list:useOrderType[] = reactive([]);

   function addList(param:useOrderType){
      // list 목록에 동일한 주문내역이 있는지 확인
      const items = list.filter((info) =>
         info.name === param.name && info.price === param.price
      )

      //값이 있으면 cnt++ 없으면 push
      if (items.length > 0) {
         items.forEach((info) =>
            info.cnt++
         )
      }else {
         list.push(param);
      };
   }


   const getDataAll = computed(()=>list);

   return { list , addList, getDataAll};

});