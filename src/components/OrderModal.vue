<template>
  <div class="backdrop" v-if="order_list.modal">
    <div class="modal-container">
      <h2>주문 내역</h2>
      <div style="overflow: scroll; overflow-x: hidden; width: 100%; height: 80%;">
        <table class="list-table">
          <thead>
            <th v-for="th in header">{{th}}</th>
          </thead>
          <tbody>
            <tr v-for="line in orderList">
              <td>{{line.resDate}}</td>
              <td>{{'( ' + line.isIce + ' ) ' + line.name}}</td>
              <td>{{line.price}}</td>
              <td>{{line.count}}</td>
              <td>{{line.size}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="btn-div">
        <v-btn style="background: #607d8b" class="btn" @click="close()">닫기</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useModalStore} from "@/stores/modalStore";
import axios from "@/plugins/axios";
import {defineProps, onMounted, onUpdated, reactive} from "vue";

const modalStore = useModalStore();
let {order_list} = modalStore;

type useType = {
  name: string,
  price: number,
  count: number,
  size: string,
  isIce: string
}

const header = {
  resDate: '주문일',
  name: '메뉴명',
  price: '가격',
  count: '주문 수',
  size: '사이즈',
}
const orderList: useType[] = reactive([]);

const getOrderList = onMounted(() => {
  const apiMenuList = axios.post('/api/getOrderList').then((res) => {
    res.data.forEach((value: useType) => {
      orderList.push(value)
    })
  });
})


const close = () => {
  order_list.modal = false;
}


</script>

<style scoped>
*{color: white;}
h2{margin-bottom: 30px; text-align: center;}
p{font-weight: bold; font-size: 18px;}

.btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.list-table {
  width: 100%;
  text-align: center;
  border-top: 1px solid white;
  border-collapse: collapse;
}

th, td {
  padding: 20px;
  border-bottom: 1px solid white;
}

th {
  font-size: 18px;
}

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
  background: #212121;
  border-radius: 10px;
  max-width: 800px;
  max-height: 800px;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  position: relative;
}
</style>