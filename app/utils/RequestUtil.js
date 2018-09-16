const baseUrl = 'https://myhostex.com/';

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
