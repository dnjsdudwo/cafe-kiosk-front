import { defineStore } from "pinia";
import {ref, computed, reactive} from "vue";

export const useCartStore = defineStore("cartStore", ()=>{
   const list: object[] = reactive([]);

   function addList(param: object){
      list.forEach( info => {
         if(info == param) {
            // @ts-ignore
            info.cnt++;
         }else {
            list.push(param);
         }
      })
       list.push(param);
   }

   const getDataAll = computed(()=>list);


   return { list , addList, getDataAll};

});