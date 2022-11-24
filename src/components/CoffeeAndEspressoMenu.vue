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

const menuList = reactive([
  {
    name: "아메리카노"
    , price: 2000
    , menuInfo: "커피의 풍미를 천천히 간단하게 즐길 수 있는 음료"
    , count : 0
    , type :"coffee"
  }
  , {
    name: "카페라떼"
    , price: 2500
    , menuInfo: "우유를 더해, 보다 부드럽고 포만감을 느낄 수 있는 커피"
    , count : 0
    , type :"coffee"
  }
  , {
    name: "콜드브루"
    , price: 3000
    , menuInfo: "부드러운 맛을 느낄 수 있는 브라질 피베리 콜드브루"
    , count : 0
    , type :"coffee"
  }
  , {
    name: "카푸치노"
    , price: 2500
    , menuInfo: "커피의향, 우유의맛, 거품의 촉감을 한 번에 즐길 수 있는 음료"
    , count : 0
    , type :"coffee"
  }
  , {
    name: "꿀커피"
    , price: 3000
    , menuInfo: "아메리카노에 꿀을더해 자극없이 편안하게 즐길 수 있는 음료"
    , count : 0
    , type :"coffee"
  }
  , {
    name: "카페모카"
    , price: 3500
    , menuInfo: "달달하고 휘핑과 함께 즐길 수 있는 커피"
    , count : 0
    , type :"coffee"
  }
])

type useType = {
  name: string,
  price: number,
  menuInfo: string,
  count: number,
  type: string
}

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
