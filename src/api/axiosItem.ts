import {useItemStore} from "@/stores/orderItemStore";
import instance from "@/plugins/axios";

const addItem = async (data:object,url:string) => {
        const response =  instance.post(url,data);
        return response;
}

const addCoffee = async (data:object) => {
    const useItem = useItemStore();
    const {coffees} = useItem

    const url = '/api/add/coffee';
        const response =  await addItem(data,url)
        response?.data.map((x:any, i:number) => {
            coffees[i] = response?.data[i];
        })
}

const addDrink = async (data:object) => {
    const useItem = useItemStore();
    const {drinks} = useItem

    const url = '/api/add/drink';
    const response =  await addItem(data,url)
    response?.data.map((x:any,i:number) => {
        drinks[i] = response?.data[i];
    })
}



export {addCoffee,addDrink}