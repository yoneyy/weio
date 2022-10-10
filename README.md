<div align="center">
  <img src="https://yoneyy.gonghuolianmeng.com/2022-10-10-021650.png" alt="weio" style="zoom:30%;" />
</div>

<div align="center">
	<img src="https://img.shields.io/github/stars/yoneyy/weio?color=yellow" />
  <img src="https://img.shields.io/github/forks/yoneyy/weio" />
  <img src="https://img.shields.io/github/issues/yoneyy/weio" />
  <img src="https://img.shields.io/github/license/yoneyy/weio?logo=MIT" />
</div>


**Promise based HTTP client for for wechat miniprogram**

## How to install `weio` ?
```sh
  # yarn
  yarn add weio -S --registry=https://registry.npmjs.org/

  # npm
  npm i weio -S --registry=https://registry.npmjs.org/
```

## How to use `weio` ?

安装完之后需在`微信开发者工具`在菜单栏中找到 `工具` --> `构建npm`

After installation, you need to find the build npm option under Tools in the `WeChat Developer Tools` menu bar

<div align="center">
  <img src="https://yoneyy.gonghuolianmeng.com/2022-10-10-091134.png" alt="image-20221010105126334" style="zoom: 33%;" />
</div>



```ts
// esm
import weio from 'weio';

const request = weio.create({
  baseURL: 'https://example.com'
});

// 请求拦截器
// request interceptors
request.interceptors.request.use(request => {
  return request;
}, error => {
  return error;
});

// 响应拦截器
// response interceptors
request.interceptors.response.use(response => {
  return request;
}, error => {
  return error;
});

const {data: ret} = await request.get(url [,options]);
const {data: ret} = await request.head(url [,options]);
const {data: ret} = await request.delete(url [,options]);
const {data: ret} = await request.options(url [,options]);

const {data: ret} = await request.put(url [,data [,options]]);
const {data: ret} = await request.post(url [,data [,options]]);
```

```ts
// cjs
const weio = require('weio');

const request = weio.create({
  baseURL: 'https://example.com'
});

// 请求拦截器
// request interceptors
request.interceptors.request.use(request => {
  return request;
}, error => {
  return error;
});

// 响应拦截器
// response interceptors
request.interceptors.response.use(response => {
  return request;
}, error => {
  return error;
});

const {data: ret} = await request.get(url [,options]);
const {data: ret} = await request.head(url [,options]);
const {data: ret} = await request.delete(url [,options]);
const {data: ret} = await request.options(url [,options]);

const {data: ret} = await request.put(url [,data [,options]]);
const {data: ret} = await request.post(url [,data [,options]]);
```

