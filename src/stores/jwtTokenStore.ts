import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import jwtDecode from "jwt-decode";
export const userTokenStore = defineStore('token', () => {
    const accessTokenExpireIn = ref(0)

    const isAccessTokenExpire = () => {

    }
    return {accessTokenExpireIn}
})