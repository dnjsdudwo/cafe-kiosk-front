import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "@/plugins/axios";

type useType = {
    name: string,
    price: number,
    menuInfo: string,
    count: number,
    isIce: string,
    size : string,
    type: string,
}

export const useCartStore = defineStore("cartStore", () => {
    const allPrice = reactive({price: 0});
    const cartList: useType[] = reactive([]);

    const addCart = (menu: useType) => {
        const chkList =
            cartList.filter((value) => value.name == menu.name &&
                                               value.size == menu.size &&
                                               value.isIce == menu.isIce )

        if (chkList.length > 0) {
            plusCnt(chkList[0]);
        } else {
            plusCnt(menu);
            cartList.push(menu)
        }
    }

    const minusCnt = (cart: useType, index: number) => {
        if (cart.count > 0) {
            cart.count--;
            allPrice.price -= cart.price;
        }

        if (cart.count == 0) {
            cartList.splice(index, 1);
        }
    }

    const plusCnt = (cart: useType) => {
        cart.count++;
        allPrice.price += cart.price;
    }

    const delCart = (cart: useType, index: number) => {
        allPrice.price -= cart.price * cart.count;

        cartList.splice(index, 1);
    }

    const resultMessage = () => {
        let msg = '주문이 완료 되었습니다.';
        if(cartList.length == 0) {
            msg = '음료를 선택해 주세요';
        }
        alert(msg);
    }

    const init_order = () => {
        if(cartList.length != 0) {
            cartList.splice(0, cartList.length);
            allPrice.price = 0;

            coffeeList.splice(0, coffeeList.length);
            drinkList.splice(0, drinkList.length);
        }
    }

    const coffeeList: useType[] = [];
    const drinkList: useType[] = [];

    const splitList = () => {
        cartList.forEach((value) => {
            if(value.type == 'coffee') {
                coffeeList.push(value);
            }else if(value.type == 'drink') {
                drinkList.push(value);
            }
        })

    }

    const order_axios = async () => {
        splitList();
        const priceRes = await axios.post('/api/allPrice', allPrice.price)
        if(coffeeList.length > 0){
            const response = await axios.post('/api/coffee', coffeeList)
        }
        if(drinkList.length > 0){
            const response = await axios.post('/api/drink', drinkList)
        }
    }

    return {
             allPrice
            ,cartList
            ,addCart
            ,minusCnt
            ,plusCnt
            ,delCart
            ,resultMessage
            ,init_order
            ,order_axios
           };
});