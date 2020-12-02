/**
 * @param {*} n
 * 获取url参数
 */
export const getQueryString = (name: string): string | null => {
  const regExp = `(^|&)${name}=([^&]*)(&|$)`;
  const reg = new RegExp(regExp, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) return decodeURIComponent(r[2]);
  return null;
};
