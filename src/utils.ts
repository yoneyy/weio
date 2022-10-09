/**
 * typeOf
 * @param v 
 * 
 * @author yoneyy (y.tianyuan)
 */
export function typeOf(v: any) {
  const [type] = Object.prototype.toString.call(v).match(/[A-Z]\w+/) as RegExpExecArray;
  return type.toLocaleLowerCase();
}