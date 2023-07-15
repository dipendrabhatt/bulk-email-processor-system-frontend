import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})

export default AxiosInstance
