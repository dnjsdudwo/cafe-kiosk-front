<template>
  <div class="backdrop" v-if="add_list.modal">
    <div class="modal-container">
      <h2>상품 추가</h2>
      <p>메뉴명</p>
      <input type="text" v-model="data.name" id="menuName">
      <p>가격</p>
      <input type="text" v-model="data.price" id="menuPrice">
      <p>음료설명</p>
      <textarea v-model="data.menuInfo"></textarea>
      <p>메뉴타입</p>
      <input type="text" v-model="data.type" placeholder="coffee & drink" id="menuType">
      <div class="btn-div">
        <v-btn @click="val_check()">추가하기</v-btn>
        <v-btn class="btn" @click="close()">닫기</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useModalStore} from "@/stores/modalStore";
import axios from "@/plugins/axios";

const modalStore = useModalStore();
let {add_list} = modalStore;

const data = {
  name: '',
  price: 0,
  menuInfo: '',
  type: ''
};


const val_check = () => {
  let isVal = true;

  if(data.name == ""){
    alert("메뉴명을 입력하세요");
    (document.getElementById("menuName") as HTMLInputElement).focus();
    isVal = false;
  }else
  if(data.price < 0 || data.price == null) {
    alert("가격이 0원 이하이거나 빈칸은 될 수 없습니다.");
    (document.getElementById("menuPrice") as HTMLInputElement).focus();
    isVal = false;
  }else
  if(data.type == "" || (data.type != 'coffee' && data.type != 'drink')){
    alert("coffee 또는 drink 만 입력가능합니다.");
    (document.getElementById("menuType") as HTMLInputElement).focus();
    isVal = false;
  }

  if(isVal){
    const dataRes = axios.post('/api/addMenuList', data);

    alert("메뉴를 추가하였습니다.");
    data.name = '';
    data.price = 0;
    data.menuInfo = '';
    data.type = '';
    add_list.modal = false;
  }
}

const close = () => {
  data.name = '';
  data.price = 0;
  data.menuInfo = '';
  data.type = '';
  add_list.modal = false;
}

</script>

<style scoped>
*{color: black;}
.btn-div{text-align: right;  margin-top: 70px; color: white;}
.btn{margin-left: 20px;}
h2{margin-bottom: 30px; text-align: center;}
p{font-weight: bold; font-size: 18px;}

input[type='text'] , textarea{
  background: dimgray;
  border: 1px solid gray;
  color: white;
  padding: 5px 10px;
  width: 80%;
  margin-bottom: 20px;
}
input[type='text']::placeholder{color: darkgray;}

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
  background: #607d8b;
  border-radius: 10px;
  max-width: 600px;
  max-height: 600px;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
}
</style>