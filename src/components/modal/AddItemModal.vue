<template>
  <Transition name="modal">
    <div  class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
            <div>
              <p>음료 종류</p>
              <select v-model="item.type">
                <option value="coffee">커피</option>
                <option value="drink">음료</option>
              </select>
            </div>
            <p>이름</p>
            <input type="text" v-model="item.name">
            <p>가격</p>
            <input type="number" v-model="item.price" min="0"> 원
            <br>
            <input type="checkbox" id="m1" v-model="item.isMilk">
            <label for="m1">우유추가</label>
            <input type="checkbox" id="i1" v-model="item.isIce">
            <label for="i1">얼음 추가</label>
            <p>음료 설명</p>
            <textarea v-model="item.description"></textarea>
          </div>
          <p>음료 종류</p>
          <p>{{ itemType }}</p>
          <p>이름</p>
          <p>{{ item.name }}</p>
          <p>가격</p>
          <p>{{ item.price }}</p>
          <p>우유 추가여부</p>
          <p>{{ isMilk }}</p>
          <p>얼음 추가여부</p>
          <p>{{ isIce }}</p>
          <p>음료 설명</p>
          <p>{{ item.description }}</p>
            <div class="btn_area">
              <button class="modal-default-button"
                  @click="addBeverage(item)"
              >추가하기</button>
              <button
                  class="modal-default-button"
                  @click="show_add_item_modal=false"
              >취소</button>
            </div>
          </div>
        </div>
      <div v-if="show_fail_modal">
        <errModal/>
      </div>
      </div>
  </Transition>
</template>

<script setup lang="ts">
import {useModalStore} from "@/stores/modalStore";
import {computed, reactive, toRefs} from "vue";
import {addItem} from "@/api/axiosItem";
import {chkAddItem} from "@/api/putOrderItem";

const useStore = useModalStore();

const {show_add_item_modal,show_fail_modal} = toRefs(useStore);

const item = reactive({
  name:'',
  price:0,
  description:'',
  isMilk:true,
  isIce:true,
  type:''
})

const isMilk = computed(() => {
  return item.isMilk == true ? '추가':'추가안함';
})
const isIce = computed(() => {
  return item.isIce == true ? '추가':'추가안함';
})

const itemType = computed(() => {
  if(item.type == 'coffee'){
    return '커피';
  }
  else if(item.type == 'drink'){
    return '음료';
  }
})

const errModal = () => {
  return chkAddItem(item).modal;
}

const addBeverage = (data:any) =>{
    if(!chkAddItem(data).chk){
      show_fail_modal.value = true;
      return;
    }
  addItem(data);
  show_add_item_modal.value = false;
}


</script>


<style scoped>
@import "@/assets/css/DetailCoffeeModal.css";
</style>