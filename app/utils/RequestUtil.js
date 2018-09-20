import Navigator from './Navigator';
import ToastUtil from './ToastUtil';

const baseUrl = 'https://myhostex.com/';
// const baseUrl = 'https:192.168.4.140:8080/';

const request = (url, method, body) => {
  let isOk;
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}`, {
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
        console.log('responseData');
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
