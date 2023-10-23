//http处理请求拦截和响应拦截
import axios from "axios";
axios.defaults.timeout = 30000;
// 请求拦截
axios.interceptors.request.use(
  (config) => {
    //设置请求头
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["Accept"] = "application/json;charset=UTF-8";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应拦截
// axios.interceptors.response.use(
//     (response) => {
//         endLoading()
//         return response
//     },
//     (error) => {
//         Message.error(error.response.data)
//         endLoading()
//         // 获取状态码
//         const { status } = error.response
//         if (status === 401) {
//             Message.error('请重新登录')
//             //清楚token
//             localStorage.removeItem('eToken')
//             //跳转到登录页面
//             router.push('/Login')
//         }
//         return Promise.reject(error)
//     }
// )
export default axios;
