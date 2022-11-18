import {createModal} from "@/components/modal/createNewModal";
import instance from "@/plugins/axios";

const putOrder = (data:any) =>{
    try {
        const response = instance.post('/api/order',data)
        return response;
    }
    catch (e) {
        console.log(e)
        return;
    }
}

type dataType = {
    shot:string,
    type:string,
    ice:string,
    isIce:boolean,
    isMilk:boolean,
    milk:string,
    tumbler:string
}

type itemType = {
    name:string,
    type:string,
}


const chkOrder = (length:Number) => {
    const response = {modal:{}};
    if(length == 0){
        return  response.modal = createModal("알림",'상품을 먼저 추가해주세요.','',null,null);
    }
    return response.modal  = createModal('알림','주문을 완료하였습니다.','',null,null);
}

const chkDetailOrder = (data:dataType) => {
    const response = {modal:{},chk:false};
    if(data.shot == null && data.type == 'coffee'){
        response.modal  = createModal('알림','샷을 선택해주세요.','',null,null);
        return response
    }
    else if(data.ice == null && data.isIce != false){
        response.modal  = createModal('알림','핫/아이스 를 선택해주세요.','',null,null);
        return response
    }
    else if(data.milk == null && data.isMilk != false){
        response.modal  = createModal('알림','우유를 선택해주세요.','',null,null);
        return response;
    }
    else if(data.tumbler == null){
        response.modal  = createModal('알림','텀블러 사용유무를 선택해주세요.','',null,null);
        return response;
    }
    response.chk = true;
    return response;
}

const chkAddItem = (data:itemType) => {
    const response = {modal:{},chk:false};
    if(data.type == ''){
        response.modal  = createModal('알림','음료 종류는 필수사항 입니다.','',null,null);
        return response;
    }
    else if(data.name == ''){
        response.modal  = createModal('알림','음료 이름은 필수사항 입니다.','',null,null);
        return response;
    }
    response.chk = true;
    return response;
}

export {putOrder,chkOrder,chkDetailOrder,chkAddItem}