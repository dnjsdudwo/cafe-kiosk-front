import {defineStore} from "pinia";
import {reactive, ref} from "vue";

type useType = {
    name: string,
    price: number,
    menuInfo: string,
    count: number
}

export const useCartStore = defineStore("cartStore", () => {
    const allPrice = reactive({price: 0});
    const cartList: useType[] = reactive([]);

    const addCart = (menu: useType) => {
        const chkList =
            cartList.filter((value) => value.name == menu.name)

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
            cartList.splice(index);
        }
    }

    const plusCnt = (cart: useType) => {
        cart.count++;
        allPrice.price += cart.price;
    }

    const delCart = (cart: useType, index: number) => {
        allPrice.price -= cart.price * cart.count;

        cartList.splice(index);
    }

    const order = () => {
        if(cartList.length == 0) {
            alert("음료를 선택해 주세요");
            return;
        }else{
            cartList.splice(0, cartList.length);
            allPrice.price = 0;
            alert("주문이 완료 되었습니다.");
        }
    }

    return {allPrice, cartList, addCart, minusCnt, plusCnt, delCart, order};
});