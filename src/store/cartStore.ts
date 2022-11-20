import { defineStore } from "pinia";
import {ref, computed, reactive} from "vue";

export const cartStore = defineStore("cartStore", ()=>{
   const list: object[] = reactive([]);

   const name: string = '';

   function addList(param: object){
       list.push(param);
   }

   const getDataAll = computed(()=>list);


   return { list , addList, getDataAll};

});