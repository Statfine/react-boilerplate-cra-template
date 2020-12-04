import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  LOCAL_ACCESS_TOKEN,
  LOCAL_EXPIRES_IN,
  getLocal,
} from 'utils/localStorage';
import { ContainerState } from './types';

/*
 * logined Auth用户验证
 */
function isLogined(): boolean {
  return (
    !!getLocal(LOCAL_ACCESS_TOKEN) &&
    Date.now() < Number(getLocal(LOCAL_EXPIRES_IN)) - 3600000 * 1.8
  );
}

// The initial state of the App container
export const initialState: ContainerState = {
  userFetching: false,
  userLogined: isLogined(),
  userInfo: {
    id: '',
    name: '',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    actionFetchUser(state) {
      state.userFetching = true;
      state.userLogined = true;
    },
    actionInitUser(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
    },
  },
});

export const { actions: appActions, reducer, name: sliceKey } = appSlice;
