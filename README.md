# Weio

Promise based HTTP client for for wechat miniprogram

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

<img src="https://yoneyy.gonghuolianmeng.com/2022-10-10-014140.png" alt="Snipaste_2022-10-09_20-39-34" style="zoom:50%;" />

```ts
  // esm
  import weio from 'weio';

  const request = weio.create({
    baseURL: 'https://example.com'
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

const {data: ret} = await request.get(url [,options]);
const {data: ret} = await request.head(url [,options]);
const {data: ret} = await request.delete(url [,options]);
const {data: ret} = await request.options(url [,options]);

const {data: ret} = await request.put(url [,data [,options]]);
const {data: ret} = await request.post(url [,data [,options]]);
```

