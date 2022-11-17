import { defineStore } from "pinia";
import {reactive, ref} from "vue";

export const useMberStore = defineStore("mberStore", () => {
  const menu: object[] = reactive([]);
  const userId = ref("");

  const addMenu = (param: object) => {
    menu.push(param)
    userId.value = 'dd';
  }

  return { menu, userId, addMenu };
});

//=====================================

type useType = {
  name: string,
  price: number,
  menuInfo: string,
  count: number
}

export const useCartStore = defineStore("cartStore", () => {
  const allPrice = reactive({price:0});
  const cartList = reactive(new Set());

  const addCart = (menu :useType ,index :number) => {
    cartList.add(menu);
    allPrice.price += menu.price;

    cartList.forEach((value:any) =>{
      if(value.name == menu.name){
        value.count++;
      }
    })
  }

  const minusCnt = (cart: useType) => {
    if (cart.count > 0) {
      cart.count--;
      allPrice.price -= cart.price;
    }

    if(cart.count == 0){
      cartList.delete(cart);
    }
  }

  const plusCnt = (cart: useType) => {
    cart.count++;
    allPrice.price += cart.price;
  }

  const delCart = (cart: useType) => {
    allPrice.price -= cart.price*cart.count;

    cartList.delete(cart);
    cart.count = 0;
  }

  const order = () => {
    cartList.clear();
    allPrice.price = 0;
    alert("주문이 완료 되었습니다.");
  }

  return {allPrice, cartList, addCart, minusCnt, plusCnt, delCart, order};
});
