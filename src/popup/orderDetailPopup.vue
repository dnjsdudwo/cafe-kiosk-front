<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h2>주문하기</h2>
              <v-container class="grey lighten-5">
                <v-row no-gutters>
                  <v-col
                      cols="12"
                      sm="6"
                      md="8"
                  >
                    <v-img
                        width="150"
                        height="200"
                        v-bind:src="orderDrink.image"
                    ></v-img>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      class="py-2"
                  >
                    <div style="margin-top:80px;">
                      <span style="font-weight: bolder; font-size: 20px" >{{ orderDrink.menuNm }}</span>
                    </div>
                    <div>
                      가격 : {{ orderInfo.orderPrice }}원
                    </div>
                    <v-btn-toggle>
                      <v-btn  @click="orderCnt_remove();">
                        <h1>-</h1>
                      </v-btn>
                      <v-btn>
                        {{ orderInfo.cnt }}
                      </v-btn>
                      <v-btn @click="orderCnt_add();">
                        <h1>+</h1>
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-container>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <h2>Size</h2>
              <v-radio-group
                  v-model="orderInfo.size"
                  inline
              >
                <v-radio
                    v-for="size in orderSize"
                    :key ="size"
                    :label = size.name
                    :value = size.value
                    @change="changePrice();"
                 ></v-radio>
              </v-radio-group>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <h2>ICE/HOT</h2>
              <v-radio-group
                  v-model="isIceAt"
                  inline
              >
                <v-radio label="ICE ONLY" value="true"  ></v-radio>
              </v-radio-group>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <v-btn
                  x-large
                  color="success"
                  dark
                  @click="addCartList()"
              >
                주문
              </v-btn>
              <v-btn
                  x-large
                  color="error"
                  dark
                  @click="closePopup();"
              >
                취소
              </v-btn>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script setup>
import {useModalStore} from "@/store/modalStore";
import {computed, reactive, ref, toRefs} from "vue";
import {useCartStore} from "@/store/cartStore";

const { openOrderDetail_popup, orderDrink } = toRefs(useModalStore());


//팝업닫기
const closePopup = () =>{
  orderDrink.value={};
  openOrderDetail_popup.value = false;
}

const isIceAt = ref('true');
/*const props = defineProps({
  info : Object
})
const { info } = toRefs(props);
console.log(info.value)*/;

//수량체크
const orderCnt_remove = () =>{
  if(orderInfo.cnt > 1) {
    orderInfo.cnt--;
  }else{
    alert("수량은 최소 1개이상 선택하셔야합니다!")
  }
}
const orderCnt_add = () => {
  orderInfo.cnt++;
}

//주문내역에관한 정보담기
const orderInfo = reactive({
    name : orderDrink.value.menuNm,
    orderPrice : orderDrink.value.price,
    menuNo : orderDrink.value.menuNo,
    size : '',
    isIceAt : isIceAt,
    cnt : 1
})

//장바구니에 담기
const cart = useCartStore();
const { addList } = cart;
const addCartList = () =>{
  if (!orderValidation()){
    return;
  }else {
    addList(orderInfo);
    closePopup();
  }
}
const orderValidation = () =>{
    if (orderInfo.size==''){
      alert("사이즈를 선택해주세요");
      return false;
    }
  return true;
}

//사이즈 선택시마다 값 변경
const orderSize = [
    {name :'Small(-500)', value:'S'},
    {name :'Medium', value:'M'},
    {name :'Large(+500)', value:'L'}
]
const originPrice = Number(JSON.stringify(JSON.parse(orderDrink.value.price)));
const changePrice = () => {
  if (orderInfo.size=='S'){
    orderInfo.orderPrice = originPrice - 500;
  } else if( orderInfo.size == 'M'){
    orderInfo.orderPrice = originPrice;
  } else if (orderInfo.size=='L'){
    orderInfo.orderPrice = originPrice + 500;
  };


}

</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}


.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  color:#555555;
}


.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}


.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}


.modal-body {
  margin: 20px 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>