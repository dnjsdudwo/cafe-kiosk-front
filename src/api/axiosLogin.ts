import instance from "@/plugins/axios";
import { userTokenStore } from "@/stores/jwtTokenStore";
import {useCookies} from "vue3-cookies";


const axiosLogin = async (id: string, pw: string) => {
    const useToken = userTokenStore();
    try {
        const response = await instance.get("/api/login?id=" + id + "&pw=" + pw);
        console.log(response.headers.accesstoken)
        setToken(
            `${response.headers.accesstoken}`,
            `${response.headers.refreshtoken}`
        );

        console.log(useCookies().cookies.get('accessToken'))
        return response;
    } catch (e) {
        console.log(e);
    }
}

  const reGenerateToken = async () => {
    const data = {
      accessToken: useCookies().cookies.get('accessToken'),
      refreshToken: useCookies().cookies.get('refreshToken'),
    };
    const response = await instance.post("/api/regenerate/token", data);
    setToken(response.data + "", useCookies().cookies.get('refreshToken'));
  };

const setToken = (ac: string, re: string) => {
    useCookies().cookies.set('accessToken',ac)
    useCookies().cookies.set('refreshToken',re)
};

export { axiosLogin , reGenerateToken};
