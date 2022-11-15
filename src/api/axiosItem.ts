import axios from "axios";
import {useItemStore} from "@/stores/orderItemStore";


const addItem = (data:any) => {
    let item = {
        name:data.name,
        price:data.price,
        description:data.description,
        isMilk:data.isMilk,
        isIce:data.isIce,
        type:data.type
    }
    // @ts-ignore
    axios.defaults.headers.post = null;
    try {
        if(item.type == 'coffee'){
            const response = axios.post('/api/add/coffee',JSON.stringify(item),{
                headers: {'content-type': 'application/json'}
            });
            getBeverage();
            return response;
        }
        else if(item.type == 'drink'){
            const response = axios.post('/api/add/drink',JSON.stringify(item),{
                headers: {'content-type': 'application/json'}
            });
            getBeverage();
            return response;
        }

    }
    catch (e) {
        console.log(e)
        return;
    }
}

const getBeverage = async () => {
    const useItem = useItemStore();
    const {coffees,drinks} = useItem


    try {
            const response = await axios.get('/api/find/all')
            response.data.coffees.map((x:any,i:number) => {
            coffees[i] = response.data.coffees[i];
        })
            response.data.drinks.map((x:any,i:number) => {
            drinks[i] = response.data.drinks[i];
        })
        return;
    }


    catch (e) {
        console.log(e)
        return;
    }
}



export {addItem,getBeverage}