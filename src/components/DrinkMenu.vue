<template>
  <div>
    <v-container>
      <h1>Drinks </h1>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col
            v-for="(items,index) in item"
            :key="index"
            cols="12"
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
                    Order
                  </div>
                  <div class="text-h6 mb-1">
                    {{ items.name }}
                  </div>
                  <div class="text-caption">{{ items.description }}</div>
                </div>
              </v-card-item>

              <v-card-actions>
                <v-btn variant="outlined"
                       @click="showDetailItem(item[index])">
                  선택
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="show_detail_modal">
      <detailItemModal/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, toRefs} from "vue";
import {useModalStore} from "@/stores/modalStore";
import {createModal} from "@/components/modal/createNewModal";
import ShowDetailItemModal from "@/components/modal/ShowDetailItemModal.vue";
import {useItemStore} from "@/stores/orderItemStore";
import {getBeverage} from "@/api/axiosItem";


const useItem = useItemStore();
const {drinks} = toRefs(useItem)

// onMounted(()=>{
//   getBeverage();
// })

const item = reactive([
  {
    name:'초코 라떼',
    price:1200,
    isMilk:true,
    isIce:true,
    description:'맛있는 초코라떼',
    type:'drink'
  },
  {
    name:'맛밤 오트라떼',
    price:2000,
    isMilk:true,
    isIce:true,
    description:'맛있는 맛밤 오트라떼',
    type:'drink'
  },
  {
    name:'블루레몬 에이드',
    price:1500,
    isMilk:false,
    isIce:true,
    description:'맛있는 블루레몬 에이드',
    type:'drink'
  }
])
const useModal = useModalStore();

const {show_detail_modal} = toRefs(useModal);

const currentItem = {name:'',price:0,isMilk:false,isIce:false,description:'',type:''};
const showDetailItem =  (data: any) => {
  currentItem.name = data.name;
  currentItem.price= data.price;
  currentItem.isMilk = data.isMilk;
  currentItem.isIce = data.isIce;
  currentItem.description = data.description;
  currentItem.type = data.type;
  show_detail_modal.value = true;
}

// @ts-ignore
const detailItemModal = createModal('주문','','',currentItem,ShowDetailItemModal);



</script>
