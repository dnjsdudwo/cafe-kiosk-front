import axios from "axios";
import { useMberStore } from "@/stores/mber";
import { storeToRefs } from "pinia";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
    const mberStore = useMberStore();

    if (mberStore.token && !config.headers!.Authorization) {
        config.headers!.Authorization = "Bearer " + mberStore.token;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((res) => {
    const mberStore = useMberStore();

    if (res.headers.newtoken) {
        mberStore.token = res.headers.newtoken;
    }

    return res;
}, async (error) => {
    const mberStore = useMberStore();

    if (error.response.data) {
        const errorMsg = error.response.data.replace(/\n|\r/g,"")

        if ('001 Not an authorized user.' === errorMsg) {
            mberStore.token = mberStore.refreshToken;
            return instance.post(error.config.url, error.config);
        }
    }

    return Promise.reject(error);
});

export default instance;
