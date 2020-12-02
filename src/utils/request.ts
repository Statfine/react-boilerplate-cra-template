import 'whatwg-fetch';
import { merge } from 'lodash';
import { message } from 'antd';

import { API_BASE } from '../app/common/constants';
import { getLocal, setLocal, clearLocal } from './localStorage';

let isRefreshing: boolean = false;
let tempRequests: (() => void)[];

// 添加暂存请求
// 保存刷新token时的产生新请求
const addTemp = (url: string, options: object, needToken: boolean) =>
  new Promise(resolve => {
    tempRequests.push(() => resolve(request(url, options, needToken)));
  });

/**
 * 根据data.code处理数据返回
 * @param {*} data
 * @param {*} url
 * @param {*} options
 * @param {*} needToken
 */
function parseData(
  data: Record<string | number | symbol, any> = {},
  url: string,
  options: Record<string | number | symbol, any> = {},
  needToken: boolean,
) {
  if (data.code === 9001 || data.code === '401') {
    // 401 刷新token
    if (needToken) {
      // 需要token验证
      return request(url, options, needToken, true); // 重新请求，触发刷新token
    }
    window.location.href = '/'; // 不需要token验证，权限异常
    return false;
  }
  if (data.code === 9003 || data.code === 9006) {
    window.location.href = '/';
    return false;
  }

  // 正常返回数据
  if (
    data.code === '0' ||
    data.code === 0 ||
    (data.status_code >= 200 && data.status_code < 300)
  ) {
    return data;
  }

  const error = new Error(data.message);
  (error as any).data = data;
  throw error;
}

/**
 * 转化返回值
 * @param {*} response
 */
function parseJSON(response: any) {
  return response.json().catch(() => {
    const error = new Error('网络异常');
    throw error;
  });
}

/**
 *
 * @param {string} url
 * @param {object} options
 * @param {boolean} needToken
 */
export function requestNoSnack(
  url: string,
  options: object,
  needToken: boolean,
) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (getLocal('access_token')) {
    defaultOptions.headers['Authorization'] = `Bearer ${getLocal(
      'access_token',
    )}`;
  }

  const mergeOptions = merge({}, defaultOptions, options);
  return fetch(url, mergeOptions)
    .then(parseJSON)
    .then(res => parseData(res, url, options, needToken));
}

// 刷新token，刷新成功，执行暂存请求
export function refreshTokenRequest() {
  try {
    if (!getLocal('refresh_token')) {
      // refresh_token为空
      throw new Error('用户已过有效期');
    }
    isRefreshing = true;
    const refreshOptions = {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: getLocal('refresh_token'),
      }),
    };
    request(`${API_BASE}/uac/refresh/token`, refreshOptions, false)
      .then(res => {
        const result = res.data;
        setLocal('access_token', result.access_token);
        setLocal('expires_in', `${Date.now() + result.expires_in * 1000}`);
        setLocal('refresh_token', result.refresh_token);
        isRefreshing = false;
        tempRequests.forEach(func => func()); // 刷新成功执行暂存请求
        tempRequests.length = 0; // 执行完清空
      })
      .catch(() => {
        // 失败返回登录页
        clearLocal();
        window.location.href = '/';
        throw new Error('用户已过有效期');
      })
      .finally(() => {
        isRefreshing = false;
      });
  } catch (error) {
    clearLocal();
    window.location.href = '/';
    throw new Error('用户已过有效期');
  }
}

/**
 * 接口请求，返回promise
 * @param {string} url 地址
 * @param {object} options 参数
 * @param {boolean} needToken 是否需要携带token
 * @param {boolean} needRefresh  是否需要重新刷新token
 */
export default function request(
  url: string,
  options: object,
  needToken: boolean = true,
  needRefresh: boolean = false,
) {
  // 处于刷新refresh中，将请求暂存
  if (!url.includes('/uac/refresh/token') && isRefreshing) {
    return addTemp(url, options, needToken); // 将请求加入暂存
  }

  // 如果没有token或者即将到达过期时间，并且当前请求不为刷新token操作 通过refresh_token刷新token
  if (
    !url.includes('/uac/refresh/token') &&
    needToken &&
    (needRefresh ||
      !localStorage.access_token ||
      Date.now() > localStorage.expires_in - 3600000 * 1.8)
  ) {
    refreshTokenRequest();
    return addTemp(url, options, needToken); // 将当前请求加入暂存
  }

  return requestNoSnack(url, options, needToken).catch(error => {
    const msg = error.data
      ? error.message
        ? error.message
        : error
      : '网络异常';
    message.error(msg);
    throw error;
  });
}

export function get(
  url: string,
  params: object = {},
  option: object = {},
  needToken: boolean = true,
) {
  const query = Object.keys(params)
    .filter(key => params[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  const options = { method: 'GET' };
  const mergeOptions = merge({}, options, option);
  if (query) {
    return request(`${url}?${query}`, mergeOptions, needToken);
  }
  return request(`${url}`, mergeOptions, needToken);
}
