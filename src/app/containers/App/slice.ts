import { PayloadAction /* , createAsyncThunk */ } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  LOCAL_ACCESS_TOKEN,
  LOCAL_EXPIRES_IN,
  getLocal,
} from 'utils/localStorage';
import { ContainerState } from './types';
// import { apiFetchUserInfo } from './api';

/*
 * logined Auth用户验证
 */
function isLogined(): boolean {
  return (
    !!getLocal(LOCAL_ACCESS_TOKEN) &&
    Date.now() < Number(getLocal(LOCAL_EXPIRES_IN)) - 3600000 * 1.8
  );
}

// 方法一saga.ts
// 方法二 createAsyncThunk
// export const fetchUser: any = createAsyncThunk(
//   'app/fetchUser',
//   async () => {
//     const response = await apiFetchUserInfo()
//     debugger;
//     return response.data
//   }
// )

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
    actionFetchUser(state) {
      state.userFetching = true;
      state.userLogined = true;
    },
    actionInitUser(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchUser.pending]: (state, action) => {
  //     state.userFetching = true;
  //     state.userLogined = true;
  //   },
  //   [fetchUser.fulfilled]: (state, action) => {
  //     state.userInfo = action;
  //   },
  //   [fetchUser.rejected]: (state, action) => {
  //     state.userFetching = false;
  //     state.userLogined = true;
  //   },
  // },
});

export const { actions: appActions, reducer, name: sliceKey } = appSlice;
