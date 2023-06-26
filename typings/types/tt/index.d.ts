declare namespace TtMiniProgram {
  interface Tt {
    /**
     * 抖音小程序发起一个网络请求
     *
     * 网络相关的 API 在使用前需要配置域名白名单
     */
    request: (option: TtRequestOption) => void;
  }

  type TtRequestOption = {
    /** 请求地址 */
    url: string;
    /**
     * 请求 Header
     *
     * referer 不可设置
     *
     * 默认值 {"content-type": "application/json"} */
    header?: object;
    /** 网络请求方法, 默认值 GET  */
    /** @update 2021.11.29 支持 PATCH  */
    method?: "GET" | "POST" | "OPTIONS" | "PUT" | "HEAD" | "DELETE" | "PATCH";
    /**
     * 请求的参数
     * - POST/PUT/PATCH 请求时, 会附加在 HTTP Entity 里
     * - 非 POST/PUT/PATCH 请求时, 会以 Query 的形式附加在 URL 上
     */
    data?: object | ArrayBuffer;
    /** 期望返回的数据类型, 默认值 json */
    dataType?: string;
    /** 默认值  text */
    responseType?: string;
  }
}

declare let tt: TtMiniProgram.Tt