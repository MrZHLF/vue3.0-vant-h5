/** 
 *  @author 小周
 * @description  接口封装
*/ 
import axios from 'axios'
import { baseApi } from './../config'

const service = axios.create({
  baseURL: baseApi,
  withCredentials: false,
  timeout: 5000
})

// request拦截器 request interceptor
service.interceptors.request.use(config => {
  return config
},error => {
  console.log(error);
  return Promise.reject(error)
})


// respone拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if(res.status && res.status !== 200) {
    return Promise.reject(res)
  } else {
    return Promise.resolve(res)
  }
},error =>{
  return Promise.reject(error)
})
export default service