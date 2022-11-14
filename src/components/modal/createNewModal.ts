import {h} from "vue";
import Modal from "@/components/modal/Modal.vue";

// @ts-ignore
const createModal = function createNewModal(title,body,footer,param,type) {
   return h(type==null? type=Modal:type, param, {
      header: () => h('div', title),
      body: () => h('div', body),
      footer: () => h('div', footer)
   })
}

export {createModal}