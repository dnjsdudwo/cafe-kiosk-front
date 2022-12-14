<template>
  <div class="backdrop" v-if="add_list.modal || upd_list.modal">
    <div class="modal-container">
      <h2 v-if="upd_list.modal">상품 수정</h2>
      <h2 v-else>상품 추가</h2>
      <div class="btn-div2">
        <v-btn v-if="upd_list.modal" @click="beforeList()" class="btn">Before</v-btn>
      </div>
      <p>메뉴명</p>
      <input type="text" v-model="data.name" id="menuName">
      <p>가격</p>
      <input type="text" v-model="data.price" id="menuPrice">
      <p>음료설명</p>
      <textarea v-model="data.menuInfo"></textarea>
      <p>메뉴타입</p>
      <div class="type-div">
        <label><input type="radio" name="typeGroup" value="c" checked>Coffee</label>
        <label><input type="radio" name="typeGroup" value="d">Drink</label>
      </div>
      <div class="btn-div">
        <v-btn v-if="upd_list.modal" @click="val_check()">수정하기</v-btn>
        <v-btn v-else @click="val_check()">추가하기</v-btn>
        <v-btn class="btn" @click="close()">닫기</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useModalStore} from "@/stores/modalStore";
import axios from "@/plugins/axios";
import {defineProps, onUpdated, reactive} from "vue";

const modalStore = useModalStore();
let {add_list, upd_list} = modalStore;

const props = defineProps({
  selectMenu: Object
})

const data = reactive({
  menu_no: 0,
  name: '',
  price: 0,
  menuInfo: '',
  type: ''
});

const beforeList = () => {
    data.menu_no = props.selectMenu!.menu_no;
    data.name = props.selectMenu!.name;
    data.price = props.selectMenu!.price;
    data.menuInfo = props.selectMenu!.menuInfo;
}





const val_check = () => {
  let isVal = true;

  if(data.name == "") {
    alert("메뉴명을 입력하세요");
    (document.getElementById("menuName") as HTMLInputElement).focus();
    isVal = false;
  } else
  if(data.price <= 0 || data.price == null) {
    alert("가격이 0원 이하이거나 빈칸은 될 수 없습니다.");
    (document.getElementById("menuPrice") as HTMLInputElement).focus();
    isVal = false;
  }

  if(isVal){
    data.type = (document.querySelector('input[name="typeGroup"]:checked') as HTMLInputElement)?.value;

    if(add_list.modal) {
      const dataRes = axios.post('/api/addMenuList', data);

      alert("메뉴를 추가하였습니다.");
      data.name = '';
      data.price = 0;
      data.menuInfo = '';
      add_list.modal = false;

    }else if(upd_list.modal) {
      const dataRes = axios.post('/api/updMenuList', data);

      alert("메뉴를 수정하였습니다.")
      data.name = '';
      data.price = 0;
      data.menuInfo = '';
      upd_list.modal = false;
    }
  }

}

const close = () => {
  data.name = '';
  data.price = 0;
  data.menuInfo = '';
  add_list.modal = false;
  upd_list.modal = false;
}

</script>

<style scoped>
*{color: black;}
.btn-div{text-align: right;  margin-top: 60px; color: white;}
.btn-div2{text-align: right;  margin-top: 20px; color: white;}
.btn{margin-left: 20px;}
h2{margin-bottom: 30px; text-align: center;}
p{font-weight: bold; font-size: 18px;}

.type-div {
  margin-top: 10px;
}

input[type="radio"] {
  margin-right: 5px;
}
label {
  margin-right: 100px;
  font-weight: bold;
}

input[type='text'] , textarea{
  background: dimgray;
  border: 1px solid gray;
  color: white;
  padding: 5px 10px;
  width: 90%;
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