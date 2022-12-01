import axios from "axios";
import {useMberStore} from "@/stores/mber";
import {storeToRefs} from "pinia";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const mberStore = useMberStore();

  if (mberStore.token && !config.headers.Authorization) {
    config.headers.Authorization = 'Bearer ' + mberStore.token;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (res) => {
    const mberStore = useMberStore();

      console.log(res.headers.newtoken)

    if (res.headers.newtoken) {
      mberStore.token = res.headers.newtoken;
    }

    return res;
  }, async (error) => {
      const mberStore = useMberStore();

      if (error.response.status === 415) {
        return instance.post(error.config);
      }

      if (error.response.data) {
        // ==로 비교하면 false가 나온다
        if (error.response.data.indexOf('001 Not an authorized user.') > -1) {
          mberStore.token = mberStore.refreshToken;
          return instance.post(error.config.url, error.config);
        }
      }

    return Promise.reject(error);
  }
);

export default instance;
