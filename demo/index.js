import Request from '../src';

const rootDom = document.getElementById('app')
const input = document.createElement('input')
const reqBtn1 = document.createElement('button')
const reqBtn2 = document.createElement('button')
const reqBtn3 = document.createElement('button')

const style = 'width: 150px; height: 30px; display: block; margin: 10px auto';

let code = ''
input.placeholder = '输入 code'
input.oninput = function (e) {
  code = e.target.value
}
input.style = style
rootDom.appendChild(input)

reqBtn1.innerText = '请求 - 回调'
reqBtn1.onclick = req1
reqBtn1.style = style
rootDom.appendChild(reqBtn1)

reqBtn2.innerText = '请求 - Promise'
reqBtn2.onclick = req2
reqBtn2.style = style
rootDom.appendChild(reqBtn2)

reqBtn3.innerText = '请求 - 自定义链式'
reqBtn3.onclick = req3
reqBtn3.style = style
rootDom.appendChild(reqBtn3)

const onSuccess = res => console.log('init success', res)
const onFail = res => console.log('init fail', res)
const onError = res => console.log('init error', res)
const onLogin = res => console.log('init login', res)
const { request } = new Request({
  isSuccess: (res, status) => res.code === 0,
  isFail: (res, status) => res.code !== 0,
  isError: (res, status) => res.code === 500,
  isLogin: (res, status) => res.code === 50,
  onSuccess,
  onFail,
  onError,
  onLogin
});

function req1 () {
  const onSuccess = res => console.log('callback success', res)
  const onFail = res => console.log('callback fail', res)
  const onError = res => console.log('callback error', res)
  const onLogin = res => console.log('callback login', res)

  request({
    baseURL: '/api',
    data: {
      code,
      token: "364a8e3a-ce25-11e9-ab1a-00163f00da8c"
    },
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    onSuccess,
    onLogin,
    onFail,
    onError
  }).then(res => console.log('callback then', 666, res))
}

function req2 () {
  const success = res => console.log('then', 123, res)
  const error = res => console.log('catch', 789, res)

  request({
    baseURL: '/api',
    data: {
      code,
      token: "364a8e3a-ce25-11e9-ab1a-00163f00da8c"
    },
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(success)
  .catch(error)
}

function req3 () {
  const success = res => console.log('chain success', res)
  const fail = res => console.log('chain fail', res)
  const error = res => console.log('chain error', res)
  const login = res => console.log('chain login', res)
  const rest = res => console.log('chain rest', res)

  request({
    baseURL: '/api',
    data: {
      code,
      token: "364a8e3a-ce25-11e9-ab1a-00163f00da8c"
    },
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .success(success)
  .login(login)
  .fail(fail)
  .rest(rest)
  // .error(error)
}
