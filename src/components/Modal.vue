<template>
  <teleport to="body">
    <div class="backdrop" v-if="show_modal.modal">
      <div class="modal-container">
        <h1>주문상세</h1>
        <h2>{{props.selectMenu.name}}</h2>
        <div class="contents">
          <div class="hotIce-div">
            <h3>===음료선택(필수)===</h3>
            <label><input type="radio" name="isIce" value="false">HOT</label>
            <label><input type="radio" name="isIce" value="true" checked>ICE</label>
          </div>
          <div class="size-div">
            <h3>===사이즈 선택(필수)===</h3>
            <label><input type="radio" name="sizeGroup" value="S">S</label>
            <label><input type="radio" name="sizeGroup" value="M" checked>M</label>
            <label><input type="radio" name="sizeGroup" value="L">L</label>
          </div>
        </div>
        <div class="btn-div">
          <v-btn class="btn" @click="click_order()">장바구니</v-btn>
          <v-btn class="btn" @click="close">닫기</v-btn>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {useModalStore} from "@/stores/modalStore";
import {useCartStore} from "@/stores/cartStore";
import {defineProps} from "vue";

type useType = {
  name: string,
  price: number,
  menuInfo: string,
  count: number,
  isIce: boolean,
  size : string
}

const modalSt = useModalStore();
const cartStore = useCartStore();

const {addCart} = cartStore;
let {show_modal} = modalSt;

const close = () => {
  show_modal.modal = false;
}

const props = defineProps({
  selectMenu: Object
})

const click_order = () => {
  // 느낌표는 ts에서 non-null assertion 연산자다. 사실상 값이 null이 아니라는 의미
  props.selectMenu!.isIce = (document.querySelector('input[name="isIce"]:checked') as HTMLInputElement)?.value;
  props.selectMenu!.size = (document.querySelector('input[name="sizeGroup"]:checked') as HTMLInputElement)?.value;

  const parseJson = JSON.parse(JSON.stringify(props.selectMenu));
  addCart(parseJson as useType);

  show_modal.modal = false;
}

</script>

<style scoped>
  *{color: black;}
  h1{text-align: center; margin-bottom: 40px;}
  h3{margin-bottom: 10px;}
  .btn{margin-right: 20px;}
  .btn-div{text-align: right; margin-top:120px;}
  label{font-weight: bold; font-size:18px; margin-right: 70px;}
  label:hover {cursor: pointer;}
  .hotIce-div{margin-top:50px; margin-bottom: 100px;}
  .size-div{margin-top:50px; margin-bottom: 20px;}
  input[type="radio"] {margin-right: 10px;}

  .backdrop{
    z-index: 999;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }

  .modal-container{
    background: white;
    border-radius: 10px;
    max-width: 820px;
    max-height: 820px;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
  }

</style>