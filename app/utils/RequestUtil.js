import queryString from 'query-string';
import Navigator from './Navigator';
import ToastUtil from './ToastUtil';

const baseUrl = 'http://i.test177.xiaogechuangxin.com/';
// const baseUrl = 'https://www.myhostex.com/';

const request = (url, method, params) => {
  let isOk;
  let stringifiedUrl = `${baseUrl}${url}`;
  let body = params;
  if (method === 'get') {
    stringifiedUrl = `${stringifiedUrl}?${queryString.stringify(body)}`;
    body = null;
  } else {
    body = JSON.stringify(params);
  }
  return new Promise((resolve, reject) => {
    console.log('stringifiedUrl: ', stringifiedUrl);
    console.log('body: ', body);
    fetch(stringifiedUrl, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body
    })
      .then(response => {
        console.log('response: ', response);
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then(responseData => {
        if (responseData.error_code === 210001) {
          ToastUtil.showShort('登录已失效，请重新登录');
          Navigator.navigate('Login');
          return;
        }
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch(error => {
        console.log('error: ', error);
        reject(error);
      });
  });
};

export default {
  request
};
