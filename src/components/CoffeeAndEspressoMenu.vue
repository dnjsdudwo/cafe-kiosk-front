<template>
  <div>
    <v-container>
      <h1>Event</h1>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col
            v-for="(menu,index) in menuList"
            cols="12"
            sm="4"
        >
          <v-sheet class="ma-2 pa-2">
            <v-card
                class="mx-auto"
                max-width="400"
                height="210"
                variant="outlined"
            >
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">
                  </div>
                  <div class="text-h6 mb-1">{{ menu.name }}</div>
                  <div class="text-md-h6">{{ menu.price }}원</div>
                  <br>
                  <div class="text-caption">{{ menu.menuInfo }}</div>
                </div>
              </v-card-item>

              <v-card-actions>
                <v-btn variant="outlined"
                       @click="click_addCart(menu ,index)">
                  장바구니
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div style="float:left; width: 500px; height: 250px; border: 1px solid white; margin-left: 700px; padding: 10px; overflow: scroll; position: relative;">
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
    <v-btn variant="outlined" @click="click_order" style="margin-left: 20px; margin-top: 215px;">주문하기</v-btn>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useCartStore} from "@/sotre/mberStore";

const menuList = reactive([
  {
    name: "아메리카노"
    , price: 2000
    , menuInfo: "커피의 풍미를 천천히 간단하게 즐길 수 있는 음료"
    , count : 0
  }
  , {
    name: "카페라떼"
    , price: 2500
    , menuInfo: "우유를 더해, 보다 부드럽고 포만감을 느낄 수 있는 커피"
    , count : 0
  }
  , {
    name: "콜드브루"
    , price: 3000
    , menuInfo: "부드러운 맛을 느낄 수 있는 브라질 피베리 콜드브루"
    , count : 0
  }
  , {
    name: "카푸치노"
    , price: 2500
    , menuInfo: "커피의향, 우유의맛, 거품의 촉감을 한 번에 즐길 수 있는 음료"
    , count : 0
  }
  , {
    name: "끌커피"
    , price: 3000
    , menuInfo: "아메리카노에 꿀을더해 자극없이 편안하게 즐길 수 있는 음료"
    , count : 0
  }
  , {
    name: "카페모카"
    , price: 3500
    , menuInfo: "달달하고 휘핑과 함께 즐길 수 있는 커피"
    , count : 0
  }
])

type useType = {
  name: string,
  price: number,
  menuInfo: string,
  count: number
}

const cartStore = useCartStore();
const {allPrice, cartList, addCart, minusCnt, plusCnt, delCart, order} = cartStore;

const click_addCart = (menu: useType, index: number) => {
  addCart(menu, index);
}

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
