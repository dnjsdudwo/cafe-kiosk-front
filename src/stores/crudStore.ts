import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "axios";

type useType = {
    menu_no: number,
    name: string,
    price: number,
    menuInfo: string,
    count: number,
    isIce: string,
    size : string,
    type: string,
}

export const useCrudStore = defineStore("crudStore", () => {

    const selectMenu = ref({
        menu_no: 0,
        name: '',
        price: 0,
        menuInfo: '',
        count: 0,
        type: ''
    })

    const reSelectMenu = (menu: useType) => {
        selectMenu.value.menu_no = menu.menu_no;
        selectMenu.value.name = menu.name;
        selectMenu.value.price = menu.price;
        selectMenu.value.menuInfo = menu.menuInfo;
        selectMenu.value.count = menu.count;
        selectMenu.value.type = menu.type;
    }

    const delMenu = (no: number) => {
        const data = {menu_no: no}
        const isVal = confirm("메뉴를 삭제 하시겠습니까?");
        if(isVal){
            const delMenu = axios.post("/api/delMenuList", data);
            alert("삭제 되었습니다")
        }
    }

    return {selectMenu, reSelectMenu, delMenu};
})