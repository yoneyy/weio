import * as utils from './utils';
import {
  WeioRequestOptions,
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

  constructor(options?: WeioInstanceRequestOptions) {
    this.baseOptions = options ?? {};
  }

  /**
   * base request
   * 
   * @param option 
   * @returns
   * 
   * @author yoneyy (y.tianyuan)
   */
  public request<T>(option: WeioRequestComposeCustomOptions): Promise<T> {

    // compose request url
    option.url = `${this.baseOptions?.baseURL ?? ''}${option?.url}`;

    if (
      option.qs === true
      && utils.typeOf(option.data) === 'object'
      && (option.method === 'POST' || option.method === 'PUT')
    ) option.url += this.qs(option.data as Record<string, any>);

    return new Promise((resolve, reject) => {
      wx.request({
        ...this.baseOptions,
        ...option,
        success: res => resolve(res as WeioResponseSuccessResult<T>),
        fail: err => reject(err),
      })
    });
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
  private weioFactory<T>(method: WeioRequestOptions['method']) {
    return (option: WeioRequestOptions) => {
      option.method = method;
      return this.request<T>(option);
    }
  }

  /**
   * query string
   * 
   * @param data 
   * @author yoneyy (y.tianyuan)
   */
  private qs(data: Record<string, unknown>) {
    return `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`;
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