/*
 * @Author: Yoneyy (y.tianyuan) 
 * @Date: 2022-10-10 11:02:11 
 * @Last Modified by: Yoneyy (y.tianyuan)
 * @Last Modified time: 2022-10-10 14:04:15
 */

import { WeioFulfilledHandle, WeioInterceptorHandles, WeioRejectedHandle } from "./typings";

class InterceptorManager<T> {

  private interceptors: Array<WeioInterceptorHandles<T> | null> = [];

  /**
   * Add a new interceptor to the stack
   * 
   * @param fulfilled The function to handle `then` for a `Promise`
   * @param rejected The function to handle `reject` for a `Promise`
   * @author yoneyy (y.tianyuan)
   */
  public use(fulfilled: WeioFulfilledHandle<T>, rejected?: WeioRejectedHandle): number {
    this.interceptors.push({
      fulfilled,
      rejected,
    });
    return this.interceptors.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   * 
   * @param id The ID that was returned by `use`
   * @returns `true` if the interceptor was removed, `false` otherwise
   * @author yoneyy (y.tianyuan)
   */
  public eject(id: number): boolean {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
      return true;
    } else return false;
  }

  /**
   * Clear all interceptors from the stack
   * 
   * @author yoneyy (y.tianyuan)
   */
  public clear(): void {
    this.interceptors = [];
  }

  /**
   * Get interceptors stack length
   * 
   * @returns 
   * @author yoneyy (y.tianyuan)
   */
  public length(): number {
    return this.interceptors.filter(Boolean).length;
  }

  public forEach(fn: (interceptor: WeioInterceptorHandles<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) fn(interceptor);
    })
  }
}

export default InterceptorManager;