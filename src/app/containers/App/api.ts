import { API_BASE } from 'app/common/constants';
import { get } from 'utils/request';

export const apiFetchUserInfo = () => get(`${API_BASE}/users/info`);
