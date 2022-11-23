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
    <Modal :selectMenu="selectMenu" />
  </div>

</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useModalStore} from "@/stores/modalStore";
import Modal from "@/components/Modal.vue";

const menuList = reactive([
  {
    name: "블루레몬 에이드"
    , price: 3000
    , menuInfo: "생레몬 두 개가 들어가서 레몬 맛이 풍부한 에이드/티"
    , count : 0
  }
  , {
    name: "자몽 에이드"
    , price: 3000
    , menuInfo: "생자몽 하나가 들어가서 자몽 맛이 풍부한 에이드/티"
    , count : 0
  }
  , {
    name: "인크레드불"
    , price: 3500
    , menuInfo: "바쁜 일상생활에 활력을 불어넣어주는 새콤달콤한 음료"
    , count : 0
  }
  , {
    name: "파인애플주스"
    , price: 2500
    , menuInfo: "새콤달콤 과즙가득 파인애플주스"
    , count : 0
  }
])

type useType = {
  name: string,
  price: number,
  menuInfo: string,
  count: number
}

const modalStore = useModalStore();
let {show_modal} = modalStore;


const selectMenu = ref({
  name: '',
  price: 0,
  menuInfo: '',
  count: 0,
})


const click_selectMenu = (menu: useType) => {
  selectMenu.value.name = menu.name;
  selectMenu.value.price = menu.price;
  selectMenu.value.menuInfo = menu.menuInfo;
  selectMenu.value.count = menu.count;

  show_modal.modal= true;
}



</script>
