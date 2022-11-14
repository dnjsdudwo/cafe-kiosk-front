<template>
  <div class="order_list_area">
    <h1 class="title_price">가격 : {{ allPrice }} 원</h1>
    <v-btn variant="outlined" class="btn_order" @click="orderItem">
      주문하기
    </v-btn>
    <v-btn variant="outlined" class="btn_reset" @click="resetItem">
      초기화
    </v-btn>
    <div class="list_item_area">
      <ul>
        <li v-for="(data,index) in orderList " :key="index" >
          {{ data.name }} {{ data.ice }} {{ data.shot }}샷  {{ data.milk }} 텀블러:{{ data.tumbler }}
          <v-btn variant="outlined" @click="increaseItem(index)">+</v-btn>
          <span> {{ data.count }} </span>
          <v-btn variant="outlined" @click="decreaseItem(index)">-</v-btn>
        </li>
      </ul>
    </div>
    <div v-if="show_modal">
      <resultOrderModal/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, toRefs} from "vue";
import {chkOrder, putOrder} from "@/api/putOrderItem";
import {useItemStore} from "@/stores/orderItemStore";
import {useModalStore} from "@/stores/modalStore";


const useItem = useItemStore();
const useStore = useModalStore();

const orderList = reactive(useItem.orderList);
const listLength = ref(0);
const { show_modal } = toRefs(useStore);


onMounted(() => {
  orderList.splice(0,orderList.length);
})

const increaseItem = (index:number) => {
  orderList[index].count++;
};
const decreaseItem = (index:number) => {
  if(orderList[index].count > 1){
    orderList[index].count--;
    return;
  }
  orderList.splice(index,1);
};

const orderItem = async () => {
  listLength.value = orderList.length;
  if(orderList.length == 0){
    show_modal.value = true;
    return;
  }
  const data = {coffees: {},drinks: {}};
  data.coffees = orderList.filter((a)=>a.type == 'coffee');
  data.drinks = orderList.filter((a)=>a.type == 'drink');
  const response = await putOrder(data);
  show_modal.value = true;
  // @ts-ignore
  console.log(response.data)
  resetItem();
}
const resetItem = () => {
  orderList.splice(0,orderList.length);
}

const allPrice = computed(() => {
  let sum = 0;
  orderList.forEach((a) => {
    sum += (a.price*a.count)
  })
  return sum;
})

const resultOrderModal = ()  => {
  return chkOrder(listLength.value);
}

</script>

<style scoped>
@import "@/assets/css/OrderList.css";
</style>