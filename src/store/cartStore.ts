import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const cartStore = defineStore("cartStore", ()=>{
   const list = ref([]);

   function addList(param:any){
       // @ts-ignore
       list.value.push(param);
   }

   const getDataAll = computed(()=>list.value);


   return { list , addList, getDataAll};

});