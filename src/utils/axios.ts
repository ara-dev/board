import axios from 'axios'
import { baseURL } from '../../themeConfig'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const _axios = axios.create({
  baseURL,
  headers,
})

_axios.interceptors.request.use(
  (config) => {
    //config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
export default _axios
