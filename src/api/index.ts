import axios from 'axios'
import url from '../constants/url'

const AxiosInstance = axios.create({
  baseURL: url.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: {

  },
})


export default AxiosInstance
