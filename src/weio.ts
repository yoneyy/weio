/*
 * @Author: Yoneyy (y.tianyuan) 
 * @Date: 2022-10-10 11:00:08 
 * @Last Modified by: Yoneyy (y.tianyuan)
 * @Last Modified time: 2022-10-10 17:05:36
 */

import * as utils from './utils';
import InterceptorManager from './interceptor';
import {
  WeioResponse,
  WeioRequestOptions,
  WeioInterceptorHandles,
  WeioInterceptorManager,
  WeioResponseSuccessResult,
  WeioInstanceRequestOptions,
  WeioRequestComposeCustomOptions,
  WeioRequestOmitDataAndURLOptions,
  WeioRequestComposeCustomOmitDataAndURLOptions,
} from './typings';

class Weio {

  /**
   * base options
   * 
   * @author yoneyy (y.tianyuan)
   */
  private readonly baseOptions: WeioInstanceRequestOptions;

  interceptors = {
    request: new InterceptorManager<WeioRequestComposeCustomOptions>() as WeioInterceptorManager<WeioRequestComposeCustomOptions>,
    response: new InterceptorManager<WeioResponse>() as WeioInterceptorManager<WeioResponse>,
  }

  constructor(options?: WeioInstanceRequestOptions) {
    this.baseOptions = options ?? {};
  }

  /**
   * core request method
   * 
   * @param option request option
   * @returns 
   * @author yoneyy (y.tianyuan)
   */
  private dispatch<R>(option: WeioRequestComposeCustomOptions): Promise<R | void> {
    if (typeof option?.url !== 'string') return Promise.resolve();
    return new Promise((resolve, reject) => {
      wx.request({
        ...this.baseOptions,
        ...option,
        success: res => resolve(res as WeioResponseSuccessResult<R>),
        fail: err => reject(err),
      })
    });
  }

  /**
   * base request
   * 
   * @param option 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  public request<R>(option: WeioRequestComposeCustomOptions): Promise<R | void> {

    // compose request url
    option.url = `${this.baseOptions?.baseURL ?? ''}${option?.url}`;

    if (
      option.qs === true
      && utils.typeOf(option.data) === 'object'
      && (option.method === 'POST' || option.method === 'PUT')
    ) {
      const existQ = /\?/g.test(option.url);
      const existKV = /(.*?)=(.*?)/g.test(option.url);
      // 如果url为 https://example.com? 则去掉qs中的 `?`
      // 如果url为 https://example.com?a=1 则直接将qs的prefix为 `&`
      option.url += this.qs(option.data as Record<string, any>, !existQ ? '?' : existKV ? '&' : '');
    };

    // const requestInterceptorChain: WeioInterceptorHandles[] = [{
    //   fulfilled: this.dispatch.bind(this),
    //   rejected: undefined,
    // }];

    const requestInterceptorChain: WeioInterceptorHandles[] = [];

    const responseInterceptorChain: WeioInterceptorHandles[] = [];

    (this.interceptors.request as InterceptorManager<WeioRequestComposeCustomOptions>).forEach(requestInterceptor => {
      requestInterceptorChain.unshift(requestInterceptor)
    });

    (this.interceptors.response as InterceptorManager<WeioResponse>).forEach(responseInterceptor => {
      responseInterceptorChain.push(responseInterceptor)
    });

    let promise;
    let newOption = option;

    // 先走请求
    while (requestInterceptorChain.length) {
      const { fulfilled, rejected } = requestInterceptorChain.shift()!;
      try {
        newOption = fulfilled(option);
      } catch (error) {
        rejected?.(error);
        break;
      }
    }

    if (newOption === undefined || newOption === null) return Promise.resolve();

    // 执行核心请求方法
    try {
      promise = this.dispatch.call(this, newOption);
    } catch (error) {
      return Promise.reject(error);
    }

    // 执行响应
    while (responseInterceptorChain.length) {
      const { fulfilled, rejected } = responseInterceptorChain.shift()!;
      promise = promise.then(fulfilled, rejected);
    }

    return promise as Promise<R>;
  }

  /**
   * Create a new weio instance
   * 
   * @param options 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  static create(options?: WeioInstanceRequestOptions): Weio {
    return new Weio(options);
  }

  /**
   * weio factory
   * 
   * @param method 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  private weioFactory<T = WechatMiniprogram.IAnyObject, R = WeioResponse<T>>(method: WeioRequestOptions['method']) {
    return (option: WeioRequestOptions) => {
      option.method = method;
      return this.request<R>(option);
    }
  }

  /**
   * query string
   * 
   * @param data 
   * @author yoneyy (y.tianyuan)
   */
  private qs(data: Record<string, unknown>, prefix: string = '') {
    return `${prefix}${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`;
  }

  /**
   * send a get request
   * 
   * @param url 
   * @param options 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  public get<T>(url: WeioRequestOptions['url'], options?: { params: WeioRequestOptions['data'] } & WeioRequestOmitDataAndURLOptions) {
    const get = this.weioFactory<T>('GET');
    return get({ url, data: options?.params, ...options });
  }

  /**
   * send a post request
   * 
   * @param url 
   * @param data 
   * @param options 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  public post<T>(url: WeioRequestOptions['url'], data?: WeioRequestComposeCustomOptions['data'], options?: WeioRequestComposeCustomOmitDataAndURLOptions) {
    const post = this.weioFactory<T>('POST');
    return post({ url, data, ...options });
  }

  /**
   * send a put request
   * 
   * @param url 
   * @param data 
   * @param options 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  public put<T>(url: WeioRequestOptions['url'], data?: WeioRequestComposeCustomOptions['data'], options?: WeioRequestComposeCustomOmitDataAndURLOptions) {
    const put = this.weioFactory<T>('PUT');
    return put({ url, data, ...options });
  }

  /**
   * send a delete request
   * @param url 
   * @param options 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  public delete<T>(url: WeioRequestOptions['url'], options?: { params: WeioRequestOptions['data'] } & WeioRequestOmitDataAndURLOptions) {
    const del = this.weioFactory<T>('DELETE');
    return del({ url, data: options?.params, ...options });
  }

  /**
   * send a options request
   * 
   * @param url 
   * @param options 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  public options<T>(url: WeioRequestOptions['url'], options?: { params: WeioRequestOptions['data'] } & WeioRequestOmitDataAndURLOptions) {
    const opt = this.weioFactory<T>('OPTIONS');
    return opt({ url, data: options?.params, ...options });
  }

  /**
   * send a head request
   * 
   * @param url 
   * @param options 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  public head<T>(url: WeioRequestOptions['url'], options?: { params: WeioRequestOptions['data'] } & WeioRequestOmitDataAndURLOptions) {
    const head = this.weioFactory<T>('HEAD');
    return head({ url, data: options?.params, ...options });
  }
}

export default Weio;