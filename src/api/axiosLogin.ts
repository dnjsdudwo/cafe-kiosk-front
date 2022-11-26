import instance from "@/plugins/axios";


const axiosLogin = async (id:string,pw:string) => {
    try {
        const response = await instance.get('/api/login?id='+id+'&pw='+pw)
        const accessToken = response.data;
        instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        console.log(response);
    }
    catch (e) {
        console.log(e)
    }


}

export {axiosLogin}