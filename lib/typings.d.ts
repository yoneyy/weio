/// <reference types="types" />
/**
 * origin request options type
 *
 * @author yoneyy (y.tianyuan)
 */
export declare type WeioRequestOptions = Omit<Omit<WechatMiniprogram.RequestOption<string | Record<string, any> | ArrayBuffer>, 'success'>, 'fail'>;
/**
 * compose request options type
 *
 * @author yoneyy (y.tianyuan)
 */
export declare type WeioRequestComposeCustomOptions = WeioRequestOptions & {
    qs?: boolean;
};
export declare type WeioRequestOmitDataAndURLOptions = Omit<Omit<WeioRequestOptions, 'data'>, 'url'>;
export declare type WeioRequestComposeCustomOmitDataAndURLOptions = Omit<Omit<WeioRequestComposeCustomOptions, 'data'>, 'url'>;
/**
 * success result type
 *
 * @author yoneyy (y.tianyuan)
 */
export declare type WeioResponseSuccessResult<S> = WechatMiniprogram.RequestSuccessCallbackResult<string | Record<string, any> | ArrayBuffer> & S;
/**
 * instantiate Weio request options;
 *
 * @author yoneyy (y.tianyuan)
 */
export declare type WeioInstanceRequestOptions = Omit<WeioRequestOptions, 'url'> & {
    baseURL?: string;
};
