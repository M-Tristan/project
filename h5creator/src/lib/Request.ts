import axios from 'axios'
import login from '../component/LoginDialog'
class Request {
  private instance: any;

  constructor(baseURL: string, timeout: number) {
    this.instance = axios.create({
      baseURL,
      timeout
    });
    this.interceptors()
  }

  private interceptors() {
    // 添加请求拦截器
    this.instance.interceptors.request.use(function (config: any) {
      if (localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem("token")
      }
      // 在发送请求之前做些什么
      return config;
    }, function (error: any) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    this.instance.interceptors.response.use(function (response: { status: number; data: any; }) {

      // 对响应数据做点什么
      if (response.status === 200) {
        if (response.data.code === 401) {
          login.show()
          return Promise.reject(response.data);
        } else {
          return response.data;
        }
      } else {

        return Promise.reject(response.data.msg);
      }


    }, function (error: any) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }
  get(url: string, params: any) {
    return this.instance({
      method: 'get',
      url,
      params
    })
  }
  post(url: string, data?: any) {
    return this.instance({
      method: 'post',
      url,
      data
    })
  }

}

export default Request