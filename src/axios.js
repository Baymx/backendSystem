import axios from 'axios';
import router from './router';
import md5 from 'js-md5';
import { Loading, Message } from 'element-ui';

//请求拦截器
axios.interceptors.request.use(config => {
  console.log(router.app.$route.path)
  // 登录页面的接口，不需要签名之类的数据
  if (router.app.$route.path === '/login') {
    return config;
  }

  // 其他页面需要加上
  let strObj = localStorage.getItem('Obj');
  if (!strObj) {
    console.log('未找到用户Token信息')
    router.app.$router.push('/login');
    return Promise.reject() 
  }
  // 拼装Token信息
    try {
      let UserTokenInfo = JSON.parse(strObj);
      let Sign = md5(`Unicode=${UserTokenInfo.Unicode}&Timestamp=${UserTokenInfo.Timestamp}&Token=${UserTokenInfo.Token}`);
      config.headers = {
        'cache-control': 'no-cache',
        'content-type' : 'application/json',
        'Sign': Sign,
        'Timestamp': UserTokenInfo.Timestamp,
        'Unicode': UserTokenInfo.Unicode,
        'Token': UserTokenInfo.Token,
        'RefreshToken': UserTokenInfo.RefreshToken
      };
      return config;
    } catch (e) {
      console.log('用户Token信息拼装错误 : ' + e)
      router.app.$router.push('/login');
    }
  // router.app.$router.push('/login');
  // return Promise.reject();
}, error => {
  return Promise.reject(error);
});

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response;
}, err => {
  console.log(err)
  Message({
    message: err,
    type: 'error'
  })
  return Promise.resolve(err.response);
});

axios.defaults.baseURL = '';
axios.defaults.headers = {};
axios.defaults.timeout = 30 * 1000;

export default {
  /**
   * get 获取数据接口
   * @param url 接口地址
   * @param param 接口参数
   * @returns Promise
   */
  get: function (url, param = {}) {
    let loadingInstance = Loading.service({text:"加载中"});
    return new Promise((resolve,reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        // headers: {
        //   'cache-control': 'no-cache'
        // }
      }).then(res => {
        loadingInstance.close();
        if (res.status && res.status == 200) {
          if (res.data && res.data.Code === 0) {
            resolve(res);
          } else {
            var data = res.data;
            Message({
              message: data.Message,
              type: 'error'
            })
          }
        }
      }, reject);
    })
  },
  /**
   * post 提交数据接口
   * @param url 接口地址
   * @param param 接口参数
   * @returns Promise
   */
  post: function (url, param = {}) {
    let loadingInstance = Loading.service({text:"提交中"});
    return new Promise((resolve,reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        // headers: {
        //   'cache-control': 'no-cache'
        // }
      }).then(res => {
        loadingInstance.close();
        if (res.status && res.status == 200) {
          if (res.data && res.data.Code === 0) {
            var data = res.data;
            Message({
              message: data.Message,
              type: 'success'
            })
            resolve(res);
          } else {
            var data = res.data;
            Message({
              message: data.Message,
              type: 'error'
            })
          }
        }
      }, reject);
    })
  },
  /**
   * put 提交数据接口
   * @param url 接口地址
   * @param param 接口参数
   * @returns Promise
   */
  put: function (url, param = {}) {
    let loadingInstance = Loading.service({text:"提交中"});
    return new Promise((resolve,reject) => {
      axios({
        method: 'put',
        url,
        data: param,
        // headers: {
        //   'cache-control': 'no-cache'
        // }
      }).then(res => {
        loadingInstance.close();
        if (res.status && res.status == 200) {
          if (res.data && res.data.Code === 0) {
            var data = res.data;
            Message({
              message:  "修改成功",
              type: 'success'
            })
            resolve(res);
          } else {
            var data = res.data;
            Message({
              message: data.Message,
              type: 'error'
            })
          }
        }
      }, reject);
    })
  },
  /**
   * delete 删除数据接口
   * @param url 接口地址
   * @param param 接口参数
   * @returns Promise
   */
  delete: function (url, param = {}) {
    let loadingInstance = Loading.service({text:"提交中"});
    return new Promise((resolve,reject) => {
      axios({
        method: 'delete',
        url,
        data: param,
        // headers: {
        //   'cache-control': 'no-cache'
        // }
      }).then(res => {
        loadingInstance.close();
        if (res.status && res.status == 200) {
          if (res.data && res.data.Code === 0) {
            var data = res.data;
            Message({
              message: "删除成功!",
              type: 'success'
            })
            resolve(res);
          } else {
            var data = res.data;
            Message({
              message: data.Message,
              type: 'error'
            })
          }
        }
      }, reject);
    })
  }
}
