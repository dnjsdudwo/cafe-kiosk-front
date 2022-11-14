import axios from "axios";
import {createModal} from "@/components/modal/createNewModal";

const putOrder = (data:any) =>{
    // @ts-ignore
    axios.defaults.headers.post = null;
    try {
        const response = axios.post('/api/order',data,{
            headers: {'content-type': 'application/json'}
        });
        return response;
    }
    catch (e) {
        console.log(e)
        return;
    }
}

const chkOrder = (length:Number) => {
    const response = {};
    if(length == 0){
        // @ts-ignore
        return  response.value = createModal('알림','상품을 먼저 추가해주세요.','',null);
    }
    // @ts-ignore
    return response.value  = createModal('알림','주문을 완료하였습니다.','',null);
}

const chkDetailOrder = (data:any) => {
    const response = {modal:{},chk:false};
    if(data.shot == null && data.type == 'coffee'){
        // @ts-ignore
        response.modal  = createModal('알림','샷을 선택해주세요.','',null);
        return response
    }
    else if(data.ice == null && data.isIce != false){
        // @ts-ignore
        response.modal  = createModal('알림','핫/아이스 를 선택해주세요.','',null);
        return response
    }
    else if(data.milk == null && data.isMilk != false){
        // @ts-ignore
        response.modal  = createModal('알림','우유를 선택해주세요.','',null);
        return response;
    }
    else if(data.tumbler == null){
        // @ts-ignore
        response.modal  = createModal('알림','텀블러 사용유무를 선택해주세요.','',null);
        return response;
    }
    response.chk = true;
    return response;
}

export {putOrder,chkOrder,chkDetailOrder}