<template>
  <div class="container">
    <div class="contents">
      <h2>장바구니</h2>
      <h3>결제: {{allPrice.price}} 원</h3>
      <ul>
        <li v-for="(cart, index) in cartList">
          <span v-if="cart.isIce === 'true' " style="margin-right: 7px">(Ice) </span>
          <span v-else>(Hot) </span>
          <span>{{cart.name}} {{cart.size}}</span>
          <span class="Individual-price">{{cart.price * cart.count}}</span>
          <button class="btn-minus" @click="click_minusCnt(cart, index)">-</button>
          <input class="box-count" type="text" v-model="cart.count">
          <button class="btn-plus" @click="click_plusCnt(cart)">+</button>
          <button class="btn-del" @click="click_delCart(cart, index)">x</button>
        </li>
      </ul>
    </div>
    <div>
      <v-btn class="btn-order" variant="outlined" @click="click_order()">주문하기</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "@/stores/cartStore";
import axios from "@/plugins/axios";

type useType = {
  name: string,
  price: number,
  menuInfo: string,
  count: number,
  isIce: boolean,
  size : string,
  type: string
}

const cartStore = useCartStore();
const {
        allPrice
       ,cartList
       ,minusCnt
       ,plusCnt
       ,delCart
       ,resultMessage
       ,init_order
       ,order_axios } = cartStore;

const click_minusCnt = (cart: useType, index: number) => {
  minusCnt(cart, index);
}

const click_plusCnt = (cart: useType) => {
  plusCnt(cart);
}

const click_delCart = (cart: useType, index: number) => {
  delCart(cart, index);
}

const click_order = async () => {
  resultMessage();
  await order_axios();
  init_order();
}

</script>

<style scoped>
  .container{position: absolute; bottom: 0;}
  .contents{width: 600px; height: 250px; border: 1px solid white; margin-left: 650px; padding: 10px; overflow: scroll; position: relative;}
  h2{text-align: center; margin-bottom: 15px;}
  h3{margin-bottom: 15px;}
  li{margin-bottom: 25px;}
  .Individual-price{position: absolute; left: 220px;}
  .btn-minus{width: 50px; font-weight:bold;position: absolute; left:270px;}
  .box-count{border: 1px solid white; padding: 3px 15px; width: 50px; position: absolute; left: 320px;}
  .btn-plus{width: 50px; font-weight:bold;position: absolute; left:365px;}
  .btn-del{width: 50px; font-weight:bold;position: absolute; left:480px;}
  .btn-order{position: absolute; top:210px; left: 1300px;}
</style>