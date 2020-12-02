import { API_BASE } from 'app/common/constants';
import { get } from 'utils/request';

export interface LoginParamsType {
  return_to: string;
  callback: string;
}

export const fetchLoginUrl = (params: LoginParamsType) =>
  get(`${API_BASE}/uac/login/redirect`, params, {}, false);
