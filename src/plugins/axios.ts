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
    return alert('TIME_STAMP : '+error.response.data.timeStamp+'\nCODE : '+error.response.data.code+"\nMESSAGE : "+error.response.data.message);
  }
);

export default instance;
