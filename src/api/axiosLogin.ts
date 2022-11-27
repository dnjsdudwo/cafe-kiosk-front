import instance from "@/plugins/axios";
import {userTokenStore} from "@/stores/jwtTokenStore";
import {toRefs} from "vue";


const axiosLogin = async (id:string,pw:string) => {
    const useToken = userTokenStore();
    const {accessTokenExpireIn} = toRefs(useToken);
    try {
        const response = await instance.get('/api/login?id='+id+'&pw='+pw)
        localStorage.setItem("accessToken",response.headers.accesstoken+'');
        localStorage.setItem("refreshToken",response.headers.refreshtoken+'');
    }
    catch (e) {
        console.log(e)
    }


}

export {axiosLogin}