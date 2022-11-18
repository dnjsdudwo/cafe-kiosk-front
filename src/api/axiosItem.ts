import {useItemStore} from "@/stores/orderItemStore";
import instance from "@/plugins/axios";

const addItem = async (data:FormData,url:string) => {
    try {
        const response =  instance.post(url,data,{
        headers: {'Content-Type': 'multipart/form-data'}
        });
        return response;
    }
    catch (e) {
        console.log(e)
        return;
    }
}

const addCoffee = async (data:FormData) => {
    const useItem = useItemStore();
    const {coffees} = useItem

    const url = '/api/add/coffee';
    const response =  await addItem(data,url)
    response?.data.map((x:any, i:number) => {
        coffees[i] = response?.data[i];
    })
}

const addDrink = async (data:FormData) => {
    const useItem = useItemStore();
    const {drinks} = useItem

    const url = '/api/add/drink';
    const response =  await addItem(data,url)
    response?.data.map((x:any,i:number) => {
        drinks[i] = response?.data[i];
    })
}



export {addCoffee,addDrink}