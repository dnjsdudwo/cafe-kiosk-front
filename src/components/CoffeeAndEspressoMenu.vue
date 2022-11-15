<template>
  <LoadingProgress :isView="isView"></LoadingProgress>
  <CustomAlert></CustomAlert>
  <div>
    <v-container>
      <h1>Coffee</h1>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col
            v-for="n in coffeeList"
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
          v-for="cart in cartList.list"
          :key="cart">
        <v-list-item>{{cart.name +"  " +cart.price + "원 " + cart.count}}</v-list-item>
      </v-list>
      <div>
        <h4>수량 : {{sumCart.cnt}}</h4>
        <h4>결제금액 : {{sumCart.sum}}원</h4>
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
import LoadingProgress from "./LoadingProgress.vue"
import CustomAlert from '@/components/CustomAlert.vue'
import axios from "axios";
import {cartStore} from "@/store/cartStore";


const isView = ref(false);
    const coffeeList = reactive([
         {name:'아이스 아메리카노',beans:'콜롬비아',price:3500,isIce:true,count:1}
        ,{name:'아이스 라떼',beans:'가나',price:4000,isIce:true,count:1}
        ,{name:'고구마 라떼',beans:'가나',price:4500,isIce:false,count:1}
    ]);

    const testLoading = async (info) => {
     const response = await axios.post('/api/coffee',{
        name : info.name,
        beans : info.beans,
        price : info.price,
        isIce : info.isIce
      })
      if (response.data > 0 ){ alert("성공적으로 주문되었습니다")}
    }

    const cartList = cartStore();

    const sumCart = computed(()=> {
      let sum = 0;
      let cnt = 0;
      cartList.list.forEach( info => {
        cnt += 1;
        sum += Number(info.price);
      })
      return {sum, cnt}
    })

    const insertCart = (info) => {
      cartList.addList(info);
      alert("장바구니에 추가되었습니다.");
      //함수사용해서 count수량 늘리기
     }

    const allBuy_click = () => {
      console.log(cartList.list);
    }

</script>
