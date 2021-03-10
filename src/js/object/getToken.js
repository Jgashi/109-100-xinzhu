fetch('http://demo.chuanhwa.com.tw/HcAccountApi/api/Acc/GetAccount', {
  method: 'GET',
  headers: {
    "Content-type": "application/json; charset=utf-8"
  },
  credentials: 'include',
}).then(function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
})
.then(function(data) {
  //成功取得 Token
  return response();
}).catch(function(error) {
  console.log('request failed', error);
});
