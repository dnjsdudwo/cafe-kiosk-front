import axios from "axios";

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
  (error) => {
    if(error.response.request.statusText === 'Unauthorized'){
      alert('로그인이 필요한 서비스입니다.');
      return ;
    }
    return alert('TIME_STAMP : '+error.response.data.timeStamp+'\nCODE : '+error.response.data.code+"\nMESSAGE : "+error.response.data.message);
  }
);

export default instance;
