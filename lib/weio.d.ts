import { WeioRequestOptions, WeioInstanceRequestOptions, WeioRequestComposeCustomOptions, WeioRequestOmitDataAndURLOptions, WeioRequestComposeCustomOmitDataAndURLOptions } from './typings';
declare class Weio {
    /**
     * base options
     *
     * @author yoneyy (y.tianyuan)
     */
    private readonly baseOptions;
    constructor(options?: WeioInstanceRequestOptions);
    /**
     * base request
     *
     * @param option
     * @returns
     *
     * @author yoneyy (y.tianyuan)
     */
    request<T>(option: WeioRequestComposeCustomOptions): Promise<T>;
    /**
     * Create a new weio instance
     *
     * @param options
     * @returns
     *
     * @author yoneyy (y.tianyuan)
     */
    static create(options?: WeioInstanceRequestOptions): Weio;
    /**
     * weio factory
     *
     * @param method
     * @returns
     *
     * @author yoneyy (y.tianyuan)
     */
    private weioFactory;
    /**
     * query string
     *
     * @param data
     * @author yoneyy (y.tianyuan)
     */
    private qs;
    /**
     * send a get request
     *
     * @param url
     * @param options
     * @returns
     *
     * @author yoneyy (y.tianyuan)
     */
    get<T>(url: WeioRequestOptions['url'], options?: {
        params: WeioRequestOptions['data'];
    } & WeioRequestOmitDataAndURLOptions): Promise<T>;
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
    post<T>(url: WeioRequestOptions['url'], data?: WeioRequestComposeCustomOptions['data'], options?: WeioRequestComposeCustomOmitDataAndURLOptions): Promise<T>;
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
    put<T>(url: WeioRequestOptions['url'], data?: WeioRequestComposeCustomOptions['data'], options?: WeioRequestComposeCustomOmitDataAndURLOptions): Promise<T>;
    /**
     * send a delete request
     * @param url
     * @param options
     * @returns
     *
     * @author yoneyy (y.tianyuan)
     */
    delete<T>(url: WeioRequestOptions['url'], options?: {
        params: WeioRequestOptions['data'];
    } & WeioRequestOmitDataAndURLOptions): Promise<T>;
    /**
     * send a options request
     *
     * @param url
     * @param options
     * @returns
     *
     * @author yoneyy (y.tianyuan)
     */
    options<T>(url: WeioRequestOptions['url'], options?: {
        params: WeioRequestOptions['data'];
    } & WeioRequestOmitDataAndURLOptions): Promise<T>;
    /**
     * send a head request
     *
     * @param url
     * @param options
     * @returns
     *
     * @author yoneyy (y.tianyuan)
     */
    head<T>(url: WeioRequestOptions['url'], options?: {
        params: WeioRequestOptions['data'];
    } & WeioRequestOmitDataAndURLOptions): Promise<T>;
}
export default Weio;
