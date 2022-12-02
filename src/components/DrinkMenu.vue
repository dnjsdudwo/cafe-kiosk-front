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
                @click="openOrderDetail(n)"
            >
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">
                    New
                  </div>
                  <div class="text-h6 mb-1">
                    {{n.menuNm}}
                  </div>
                  <div class="text-caption" >{{'$' + n.price}}</div>
                </div>
              </v-card-item>
            </v-card>
          </v-sheet>
          <div v-if="openOrderDetail_popup">
            <OrderDetailPopup :info="n"/>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <h1>Cart</h1>
      <v-divider></v-divider>
      <br>
      <v-list
            v-for="cart in list"
            :key="cart">
            <v-list-item>{{cart.name +"("+cart.size+") " +cart.price + "원 " + cart.cnt}}개</v-list-item>
        </v-list>
      <div>
        <h4>총 수량 : {{sumCart.cnt}}</h4>
        <h4>결제금액 : {{sumCart.sum}} 원</h4>
      </div>
      <br>
      <v-radio-group
          v-model="takeoutAt"
          inline
      >
        <v-radio label="포장" value="Y"  ></v-radio>
        <v-radio label="매장" value="N"  ></v-radio>
      </v-radio-group>
      <div>
        <v-btn variant="outlined"
               @click="order_click()">
          주문하기
        </v-btn>
        <v-btn variant="outlined"
               @click="orderCancel_click()">
          취소
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, toRefs} from "vue";
import LoadingProgress from "./LoadingProgress.vue";
import CustomAlert from '@/components/CustomAlert.vue';
import axios from "axios";
import { useCartStore } from "@/store/cartStore";
import { useModalStore } from "@/store/modalStore";
import OrderDetailPopup from "@/popup/orderDetailPopup.vue";

const isView = ref(false);

const takeoutAt =ref('N');

//메뉴리스트 불러오기
let drinkList= reactive([]);
axios.post('/api/searchDrinkList',{ categoryNo : 2 }).then((result) => {
  const list = result.data;
  list.forEach( info => {
    drinkList.push(info);
  })
 })

//주문상세팝업 오픈
const openOrderDetail = (info) =>{
  orderDrink.value = info;
  openOrderDetail_popup.value = true;
}

//장바구니 리스트
const cart = useCartStore();
const { list } = cart;


const sumCart = computed(()=> {
  let sum = 0;
  let cnt = 0;
   list.forEach( info => {
    cnt += info.cnt;
    sum += info.price * info.cnt;
  })
  return {sum, cnt}
})

//장바구니 비우기
const orderCancel_click = () => {
  cart.list.length=0;
};


//장바구니 전체 주문하기
const order_click = async () => {
   const response = await axios.post('/api/insertOrder',{
     orderList : list,
     takeoutAt : takeoutAt.value
   })
  if (response.data > 0){ alert("성공적으로 주문되었습니다")}
}

//가독성을위해 modalStore를 변수에 넣어준다.
const modals = useModalStore();
//구조 분해 할당을 통해 값을 가져올 때 반응형을 잃지 않도록 도와주는 toRefs사용
const { openOrderDetail_popup , orderDrink } = toRefs(modals);

</script>
