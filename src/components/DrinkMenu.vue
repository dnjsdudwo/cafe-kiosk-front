<template>
  <LoadingProgress :isView="isView"></LoadingProgress>
  <CustomAlert></CustomAlert>
  <div>
    <v-container>
      <h1>Drink</h1>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col
            v-for="n in drinkList"
            :key="n"
            cols="10"
            sm="4"
        >
          <v-sheet class="ma-2 pa-2">
            <v-card
                class="mx-auto"
                max-width="400"
                variant="outlined"
            >
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">
                    New
                  </div>
                  <div class="text-h6 mb-1">
                    {{n.name}}
                  </div>
                  <div class="text-caption">{{'$' + n.price}}</div>
                </div>
              </v-card-item>

              <v-card-actions>
                <v-btn variant="outlined"
                       @click="testLoading(n)">
                  BUY
                </v-btn>
                <v-btn variant="outlined"
                       @click="insertCart(n)">
                  CART
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <h1>Cart</h1>
      <v-divider></v-divider>
        <v-list
            v-for="cart in cartList"
            :key="cart">
          <v-list-item>{{cart.name +"  " +cart.price + "원"}}</v-list-item>
        </v-list>
      <div>
        <h4>수량 : {{sumCart.cnt}}</h4>
        <h4>결제금액 : {{sumCart.sum}} 원</h4>
      </div>
      <br>
      <div>
        <v-btn variant="outlined"
               @click="allBuy_click()">
          주문하기
        </v-btn>
      </div>
    </v-container>

  </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import LoadingProgress from "./LoadingProgress.vue";
import CustomAlert from '@/components/CustomAlert.vue';
import axios from "axios";
import { cartStore } from "@/store/cartStore";

const isView = ref(false);
const drinkList = reactive([
  {name:'딸기스무디',price:5000,isIce:true,base:'딸기',flag:'drink'}
  ,{name:'망고스무디',price:5000,isIce:true,base:'망고',flag:'drink'}
  ,{name:'오렌지쥬스',price:4500,isIce:true,base:'오렌지',flag:'juice'}
])

const testLoading = async (info) => {
  const url='/api/' + info.flag;

  const response = await axios.post( url,{
    /*orderList : info*/
    name : info.name,
    price : info.price,
    isIce : info.isIce,
    base : info.base
  })

  if (response.data > 0){ alert("성공적으로 주문되었습니다")}

}

//장바구니에 담은 항목들
const cartList = cartStore().list;

 const sumCart = computed(()=> {
  let sum = 0;
  let cnt = 0;
   cartList.forEach( info => {
    cnt +=1;
    sum += Number(info.price);
  })
  return {sum, cnt}
})

const insertCart = (info) =>{
  cartStore().addList(info);
  alert("장바구니에 추가되었습니다.");
 }

const allBuy_click = async ()=>{
   const response = await axios.post('/api/juice',{
     orderList : cartList
   })
  if (response.data > 0){ alert("성공적으로 주문되었습니다")}
}

</script>
