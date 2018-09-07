import axios from 'axios'
import vue from 'vue'
 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
 
// 请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
  }, function(error) {
    return Promise.reject(error);
  })
  // 响应拦截器
axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
})
 
// 封装axios的post请求
export function fetch(method,url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null
    })
    .then(response => {
        resolve(response.data);
    })
    .catch((error) => {
        reject(error);
    })
  })
}
 
export default {
  post:function(url, params) {
    return fetch('POST',url, params);
  },
  get:function(url, params) {
    return fetch('GET',url, params);
  },
  put:function(url, params) {
    return fetch('PUT',url, params);
  },
  delete:function(url, params) {
    return fetch('DELETE',url, params);
  },
}