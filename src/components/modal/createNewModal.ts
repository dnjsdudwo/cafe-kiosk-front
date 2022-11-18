import {h} from "vue";
import Modal from "@/components/modal/Modal.vue";

const createModal = function createNewModal(title:string,body:string,footer:string,param:any,type:any) {
   return h(type==null? type=Modal:type, param, {
      header: () => h('div', title),
      body: () => h('div', body),
      footer: () => h('div', footer)
   })
}

export {createModal}