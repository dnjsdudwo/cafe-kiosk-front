<template>
  <div>
    <v-container>
      <h1>Coffee & Espresso </h1>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col
            v-for="(items,index) in coffees"
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
                  <div class="img_area" :style="{backgroundImage: `url(/api/image/${items.img_url}.jpg)`}">

                  </div>
                  <div class="text-caption">{{ items.description }}</div>
                </div>
              </v-card-item>

              <v-card-actions>
                <v-btn variant="outlined"
                       @click="showDetailItem(coffees[index])">
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
import {onMounted, reactive,toRefs, watch} from "vue";
import {useModalStore} from "@/stores/modalStore";
// @ts-ignore
import {createModal} from "@/components/modal/createNewModal";
import ShowDetailItemModal from "@/components/modal/ShowDetailItemModal.vue";
import {useItemStore} from "@/stores/orderItemStore";

const useItem = useItemStore();

const useStore = useModalStore();
const { show_detail_modal } = toRefs(useStore);

const {coffees} = toRefs(useItem);


const currentItem = {name:'',price:0,isMilk:false,isIce:false,description:'',type:''};

const item = reactive([
    {
  name:'아메리카노',
  price:1000,
  isMilk:false,
  isIce:true,
  description:'맛있는 아메리카노',
  type:'coffee'
  },
  {
    name:'콜드브루',
    price:2000,
    isMilk:false,
    isIce:true,
    description:'맛있는 콜드브루',
    type:'coffee'
  },  
  {
    name:'카페라떼',
    price:1500,
    isMilk:true,
    isIce:true,
    description:'맛있는 카페라떼',
    type:'coffee'
  },  
  {
    name:'카푸치노',
    price:2300,
    isMilk:true,
    isIce:true,
    description:'맛있는 카푸치노',
    type:'coffee'
  },
  {
    name:'카페모카',
    price:2500,
    isMilk:true,
    isIce:true,
    description:'맛있는 카페모카',
    type:'coffee'
  },  
  {
    name:'마끼아또',
    price:3000,
    isMilk:true,
    isIce:true,
    description:'맛있는 마끼아또',
    type:'coffee'
  },
  {
    name:'에스프레소',
    price:500,
    isMilk:false,
    isIce:false,
    description:'맛있는 에스프레소',
    type:'coffee'
  },
])


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

<style scoped>
.img_area{
  float: right;
  display: inline-block;
  width: 150px;
  height: 170px;
  border: 1px solid #fff;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
