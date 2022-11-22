import {defineStore} from "pinia";
import {reactive} from "vue";

type useType = {
    name: string,
    price: number,
    menuInfo: string,
    count: number
}

export const useCartStore = defineStore("cartStore", () => {
    const allPrice = reactive({price: 0});
    const cartList = reactive(new Set<useType>());
    const addCart = (menu: useType, index: number) => {
        if (cartList.size == 0) {
            cartList.add(menu);
        }

        cartList.forEach((v,value: useType) => {
            if (menu.name == value.name) {
                plusCnt(value);
            } else {
                cartList.add(menu);
            }
        })

    }

    const minusCnt = (cart: useType) => {
        if (cart.count > 0) {
            cart.count--;
            allPrice.price -= cart.price;
        }

        if (cart.count == 0) {
            cartList.delete(cart);
        }
    }

    const plusCnt = (cart: useType) => {
        cart.count++;
        allPrice.price += cart.price;
    }

    const delCart = (cart: useType) => {
        allPrice.price -= cart.price * cart.count;

        cartList.delete(cart);
        cart.count = 0;
    }

    const order = () => {
        // cartList.forEach((value:useType) => value.count = 0)
        // cartList.clear();
        // allPrice.price = 0;
        alert("주문이 완료 되었습니다.");
    }

    return {allPrice, cartList, addCart, minusCnt, plusCnt, delCart, order};
});