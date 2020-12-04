/**
 *
 * UacSucPage
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { getQueryString } from 'utils/utils';
import {
  LOCAL_ACCESS_TOKEN,
  LOCAL_EXPIRES_IN,
  LOCAL_REFRESH_TOKEN,
  setLocal,
} from 'utils/localStorage';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { appActions } from '../App/slice';

import { fetchToken } from './api';

const StyleContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UacSucPage = memo(() => {
  let history = useHistory();
  const dispatch = useDispatch();

  const initUser = useCallback(
    async (code: string | null) => {
      try {
        const result = await fetchToken({ code: code as string });
        const oauthInfo = JSON.parse(window.atob(result.data.token));
        setLocal(LOCAL_ACCESS_TOKEN, oauthInfo.access_token);
        setLocal(
          LOCAL_EXPIRES_IN,
          `${Date.now() + oauthInfo.expires_in * 1000}`,
        );
        setLocal(LOCAL_REFRESH_TOKEN, oauthInfo.refresh_token);
        console.log('oauthInfo', oauthInfo);
        dispatch(appActions.actionFetchUser());
        history.push('/user');
      } catch (error) {
        console.log(error);
      }
    },
    [history, dispatch],
  );

  useEffect(() => {
    const code = getQueryString('code');
    initUser(code);
  }, [initUser]);

  return (
    <StyleContainer>
      <Helmet>
        <title>登录跳转</title>
      </Helmet>
      <LoadingIndicator />
      <p>跳转中...</p>
    </StyleContainer>
  );
});
