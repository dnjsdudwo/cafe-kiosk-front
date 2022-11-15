<template>
  <Transition name="modal">
    <div  class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
            <h1>{{ props.name }}</h1>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
            <div class="add_shot_item" v-if="props.type == 'coffee' ">
              <input type="radio" name="shotRadio" id="s1" value="1" v-model="item.shot" @change="shotPrice=-300">
              <label for="s1">1샷-300원</label>
              <input type="radio" name="shotRadio" id="s2" value="2" v-model="item.shot" @change="shotPrice=0">
              <label for="s2">2샷</label>
              <input type="radio" name="shotRadio" id="s3" value="3" v-model="item.shot" @change="shotPrice=600">
              <label for="s3">3샷+600원</label>
            </div>
            <div class="add_ice_item" v-if="props.isIce == true">
              <input type="radio" name="iceRadio" id="i1" value="아이스" v-model="item.ice">
              <label for="i1">아이스</label>
              <input type="radio" name="iceRadio" id="i2" value="핫" v-model="item.ice">
              <label for="i2">핫</label>
            </div>
            <div class="add_milk_item" v-if="props.isMilk == true">
              <input type="radio" name="milkRadio" id="m1" value="우유" v-model="item.milk" @change="milkPrice=0">
              <label for="m1">우유</label>
              <input type="radio" name="milkRadio" id="m2" value="두유" v-model="item.milk" @change="milkPrice=300">
              <label for="m2">두유+300원</label>
              <input type="radio" name="milkRadio" id="m3" value="아몬드 밀크" v-model="item.milk" @change="milkPrice=600">
              <label for="m3">아몬드 밀크+600원</label>
            </div>
            <div class="add_cup_item">
              <br>
              <p>텀블러 사용유무</p>
              <input type="radio" name="cupRadio" id="c1" value="사용" v-model="item.tumbler">
              <label for="c1">사용</label>
              <input type="radio" name="cupRadio" id="c2" value="사용안함" v-model="item.tumbler">
              <label for="c2">사용안함</label>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
            <div class="footer_text_area">
              <p>{{ props.description }}</p>
              <br>
              <p> 주문하신 상품 </p>
              <p v-if="props.type == 'coffee'"> 샷 : {{ item.shot }}</p>
              <div v-if="props.isIce  == true">
                <p> 얼음 : {{ item.ice }}</p>
              </div>
              <div v-if="props.isMilk  == true">
                <p> 우유 : {{ item.milk }}</p>
              </div>
              <p> 텀블러 : {{ item.tumbler }}</p>
              <p> 가격 : {{ resultPrice }} </p>
            </div>
            <div class="btn_area">
              <button class="modal-default-button"
                  @click="addItem(item)"
              >추가하기</button>
              <button
                  class="modal-default-button"
                  @click="show_detail_modal=false"
              >취소</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="show_fail_modal">
        <chkModal/>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {useModalStore} from "@/stores/modalStore";
import {computed, reactive, ref, toRefs} from "vue";
import {useItemStore} from "@/stores/orderItemStore";
import {chkDetailOrder} from "@/api/putOrderItem";

const useStore = useModalStore()

const useItem = useItemStore();

const {show_detail_modal,show_fail_modal} = toRefs(useStore);
const orderList = reactive(useItem.orderList);


const props = defineProps(
    {
      name:String,
      milk:String,
      price:Number,
      description:String,
      shot:Number,
      ice:String,
      tumbler:String,
      isMilk:Boolean,
      isIce:Boolean,
      type:String
    }
)

const item = reactive({
  shot:ref(props.shot),
  milk:ref(props.milk),
  price:ref(props.price),
  isMilk:ref(props.isMilk),
  isIce:ref(props.isIce),
  ice:ref(props.ice),
  tumbler:ref(props.tumbler),
})

const shotPrice = ref(0);
const milkPrice = ref(0);


// @ts-ignore
const addItem = (data) => {
  // @ts-ignore
  if (!chkDetailOrder(data).chk) {
    show_fail_modal.value = true;
    return;
  }
  orderList.push({
    // @ts-ignore
    name: props.name,
    shot: data.shot,
    milk: data.milk,
    ice: data.ice,
    tumbler: data.tumbler,
    price:resultPrice.value,
    count:1,
    type:props.type
  });
  show_detail_modal.value = false;
}

const chkModal = computed(() => {
  // @ts-ignore
  return chkDetailOrder(item).modal;
})

const resultPrice = computed(() => {
  // @ts-ignore
  return item.price+shotPrice.value+milkPrice.value;
})

</script>



<style scoped>
@import "@/assets/css/DetailCoffeeModal.css";
</style>