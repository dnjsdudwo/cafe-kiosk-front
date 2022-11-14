import axios from "axios";

const addItem = (data:any) => {
    let item = {
        name:data.name,
        price:data.price,
        description:data.description,
        isMilk:data.isMilk,
        isIce:data.isIce,
        type:data.type
    }
    console.log(item)
    // @ts-ignore
    axios.defaults.headers.post = null;
    try {
        if(item.type == 'coffee'){
            const response = axios.post('/api/add/coffee',JSON.stringify(item),{
                headers: {'content-type': 'application/json'}
            });
            return response;
        }
        else if(item.type == 'drink'){
            const response = axios.post('/api/add/drink',JSON.stringify(item),{
                headers: {'content-type': 'application/json'}
            });
            return response;
        }

    }
    catch (e) {
        console.log(e)
        return;
    }
}

const getCoffee = async () => {
    try {
        const response = await axios.get('/api/find/coffee')
        return response.data;
    }
    catch (e) {
        console.log(e)
        return;
    }
}
const getDrink = async () => {
    try {
        const response = await axios.get('/api/find/drink')
        return response.data;
    }
    catch (e) {
        console.log(e)
        return;
    }
}


export {addItem,getCoffee,getDrink}