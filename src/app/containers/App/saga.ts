import { fork, call, takeLatest, all, put } from 'redux-saga/effects';
import { LOCAL_ACCESS_TOKEN, getLocal } from 'utils/localStorage';
import { apiFetchUserInfo } from './api';
import { appActions } from './slice';
import { UserInfoState } from './types';

function isAllow(): boolean {
  const NO_AUTH_URL = ['/uacsuc', '/login'];
  const { pathname } = window.location;
  return NO_AUTH_URL.includes(pathname);
}

function* fetchUserInfoWatcher() {
  if (isAllow() || !getLocal(LOCAL_ACCESS_TOKEN)) return;
  yield all([call(apiFetchUserInfo)]);
}

export function* fetchUserInfoSaga() {
  try {
    const { data } = yield call(apiFetchUserInfo);
    const info: UserInfoState = {
      id: data.id,
      name: data.name || data.email,
    };
    yield put(appActions.actionInitUser(info));
  } catch (error) {
    console.error(error);
  }
}

export function* appSaga() {
  yield fork(fetchUserInfoWatcher);
  yield takeLatest(appActions.actionFetchUser.type, fetchUserInfoSaga);
}
