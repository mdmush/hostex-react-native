import queryString from 'query-string';
import Navigator from './Navigator';
import ToastUtil from './ToastUtil';

const baseUrl = 'https://myhostex.com/';
// const baseUrl = 'https:192.168.4.140:8080/';

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
    fetch(stringifiedUrl, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body
    })
      .then(response => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then(responseData => {
        console.log('responseDate', responseData);
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
        reject(error);
      });
  });
};

export default {
  request
};
