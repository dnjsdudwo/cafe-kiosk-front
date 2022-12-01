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
                  <div class="text-h6 mb-1">
                    {{ menu.name }}
                    <span class="x-span" @click="click_del_menu(menu.menu_no)">x</span>
                    <span class="o-span" @click="click_upd_menu(menu)">o</span>
                  </div>
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
    <Modal :selectMenu="selectMenu" />
    <updMenuList :selectMenu="selectMenu"></updMenuList>
  </div>

</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useModalStore} from "@/stores/modalStore";
import {useCrudStore} from "@/stores/crudStore";
import Modal from "@/components/Modal.vue";
import updMenuList from "@/components/AddMenuList.vue";
import axios from "axios";


type useType = {
  menu_no: number,
  name: string,
  price: number,
  menuInfo: string,
  count: number,
  type: string,
  size: string,
  isIce: string
}

const menuList: useType[] = reactive([]);

const apiMenuList = axios.post('/api/getMenuList?type=drink').then((res) => {
  res.data.forEach((value: useType) => {
    menuList.push(value)
  })
});

const modalStore = useModalStore();
let {show_modal, upd_list} = modalStore;

const crudStore = useCrudStore();
let {selectMenu, reSelectMenu, delMenu} = crudStore;


const click_selectMenu = (menu: useType) => {
  reSelectMenu(menu);
  show_modal.modal= true;
}

const click_del_menu = (no: number) => {
  delMenu(no);
}

const click_upd_menu = (menu: useType) => {
  reSelectMenu(menu);
  upd_list.modal = true;
}

</script>
<style scoped>
.x-span{position: absolute; right: 10px; top: 0; cursor: pointer;}
.o-span{position: absolute; right: 30px; top: 0; cursor: pointer;}
</style>
