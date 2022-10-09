# Weio

Promise based HTTP client for for wechat miniprogram

## How to install it ?
```sh
  # yarn
  yarn add weio -S --registry=https://registry.npmjs.org/

  # npm
  npm add weio -S --registry=https://registry.npmjs.org/
```

## How to use it ?
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

  const {data: ret} = await request.put(url [,data] [,options]);
  const {data: ret} = await request.post(url [,data] [,options]);
```