import axios from "axios"
import url from "../constants/url"

const token = localStorage.getItem('token')
console.log("🚀 ~ file: index.ts:13 ~ token:", token)
export const PrivateAxiosInstance = axios.create({
    baseURL: url.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: {
    },

})