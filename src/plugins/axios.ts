import axios from "axios";
import {reGenerateToken} from "@/api/axiosLogin";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
      return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
      return res;
  },
  async (error) => {
      console.log(error)
      if(error.response.headers.regenerate === 'RE'){
          await reGenerateToken()
      }
      if(error.response.data.timeStamp == undefined){
          return alert("서버에러가 발생했습니다. 다시시도해주세요.")
      }
      return alert('TIME_STAMP : '+error.response.data.timeStamp+'\nCODE : '+error.response.data.code+"\nMESSAGE : "+error.response.data.message);
  }
);

export default instance;
