
/**
 * origin request options type
 * 
 * @author yoneyy (y.tianyuan)
 */
export type WeioRequestOptions = Omit<Omit<WechatMiniprogram.RequestOption<string | Record<string, any> | ArrayBuffer>, 'success'>, 'fail'>;

/**
 * compose request options type
 * 
 * @author yoneyy (y.tianyuan)
 */
export type WeioRequestComposeCustomOptions = WeioRequestOptions & {
  qs?: boolean;
};

export type WeioRequestOmitDataAndURLOptions = Omit<Omit<WeioRequestOptions, 'data'>, 'url'>;
export type WeioRequestComposeCustomOmitDataAndURLOptions = Omit<Omit<WeioRequestComposeCustomOptions, 'data'>, 'url'>;

/**
 * success result type
 * 
 * @author yoneyy (y.tianyuan)
 */
export type WeioResponseSuccessResult<S> = WechatMiniprogram.RequestSuccessCallbackResult<string | Record<string, any> | ArrayBuffer> & S;

/**
 * instantiate Weio request options;
 * 
 * @author yoneyy (y.tianyuan)
 */
export type WeioInstanceRequestOptions = Omit<WeioRequestOptions, 'url'> & { baseURL?: string; };