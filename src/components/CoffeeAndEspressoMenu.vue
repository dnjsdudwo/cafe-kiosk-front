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
                       @click="click_selectMenu(menuList[index])">
                  선택
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <Modal :selectMenu="selectMenu"/>
  </div>

</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useModalStore} from "@/stores/modalStore";
import Modal from "@/components/Modal.vue";
import axios from "axios";

type useType = {
  name: string,
  price: number,
  menuInfo: string,
  count: number,
  type: string,
  size: string,
  isIce: string
}


const menuList: useType[] = reactive([]);

const apiMenuList = axios.post('/api/getMenuList?type=coffee').then((res) => {
  res.data.forEach((value: useType) => {
    menuList.push(value)
  })
});




const modalStore = useModalStore();
let {show_modal} = modalStore;

const selectMenu = ref({
  name: '',
  price: 0,
  menuInfo: '',
  count: 0,
  type: ''
})

const click_selectMenu = (menu: useType) => {
  selectMenu.value.name = menu.name;
  selectMenu.value.price = menu.price;
  selectMenu.value.menuInfo = menu.menuInfo;
  selectMenu.value.count = menu.count;
  selectMenu.value.type = menu.type;

  show_modal.modal= true;
}




</script>
