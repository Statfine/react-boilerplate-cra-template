import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.app || initialState;

export const selectApp = createSelector([selectDomain], appState => appState);

export const selectUserInfo = createSelector(
  [selectApp],
  appState => appState.userInfo,
);

export const selectLogined = createSelector(
  [selectApp],
  appState => appState.userLogined,
);
