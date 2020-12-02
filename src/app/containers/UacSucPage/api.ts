import { API_BASE } from 'app/common/constants';
import { get } from 'utils/request';

export interface TokenParamsType {
  code: string;
}

export const fetchToken = (params: TokenParamsType) =>
  get(`${API_BASE}/uac/token`, params, {}, false);
