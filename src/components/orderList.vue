<template>
  <div style="position: absolute; bottom: 0;">
    <div style="width: 500px; height: 250px; border: 1px solid white; margin-left: 700px; padding: 10px; overflow: scroll; position: relative;">
      <h2 style="text-align: center; margin-bottom: 15px">장바구니</h2>
      <h3 style="margin-bottom: 15px;">결제: {{allPrice.price}} 원</h3>
      <ul>
        <li v-for="cart in cartList" style="margin-bottom: 25px;">
          <span>{{cart.name}}</span>
          <button @click="click_minusCnt(cart)" style="width: 50px; font-weight:bold;position: absolute; left:150px;">-</button>
          <input type="text" v-model="cart.count" style="border: 1px solid white; padding: 3px 15px; width: 50px; position: absolute; left: 200px">
          <button @click="click_plusCnt(cart)" style="width: 50px; font-weight:bold;position: absolute; left:245px;">+</button>
          <button @click="click_delCart(cart)" style="width: 50px; font-weight:bold;position: absolute; left:380px;">x</button>
        </li>
      </ul>
    </div>
    <div>
      <v-btn variant="outlined" @click="click_order" style="position: absolute; top:210px; left: 1250px;">주문하기</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
type useType = {
  name: string,
  price: number,
  menuInfo: string,
  count: number
}

import {useCartStore} from "@/sotre/mberStore";

const cartStore = useCartStore();
const {allPrice, cartList, minusCnt, plusCnt, delCart, order} = cartStore;

const click_minusCnt = (cart: useType) => {
  minusCnt(cart);
}

const click_plusCnt = (cart: useType) => {
  plusCnt(cart);
}

const click_delCart = (cart: useType) => {
  delCart(cart);
}

const click_order = () => {
  order();
}
</script>
