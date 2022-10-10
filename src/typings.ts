
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

type WeioResponseDefaultData = string | ArrayBuffer | WechatMiniprogram.IAnyObject;

/**
 * Weio response
 * 
 * @author yoneyy (y.tianyuan)
 */
export type WeioResponse<T = WeioResponseDefaultData> = {
  cookies: string[];
  data: T;
  header: Record<string, any>;
  profile: WechatMiniprogram.RequestProfile;
  statusCode: number;
  errMsg: string;
};


/**************************************************************************/

export type WeioRejectedHandle = (err: any) => any;
export type WeioFulfilledHandle<T = any> = (val: T) => T | Promise<T> | void;

/**
 * weio interceptor handles
 * 
 * @author yoneyy (y.tianyuan)
 */
export type WeioInterceptorHandles<T = any> = {
  fulfilled: WeioFulfilledHandle<T> | ((val: WeioRequestComposeCustomOptions) => Promise<WeioResponse>);
  rejected?: WeioRejectedHandle;
};

export type WeioInterceptorManager<T> = {
  use(fulfilled: WeioFulfilledHandle<T>, rejected?: WeioRejectedHandle): number;
  eject(id: number): boolean;
}