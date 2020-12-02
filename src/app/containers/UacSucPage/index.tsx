/**
 *
 * UacSucPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { Spin, Space } from 'antd';
import { getQueryString } from 'utils/utils';
import { setLocal } from 'utils/localStorage';

import { fetchToken } from './api';

const StyleContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UacSucPage = memo(() => {
  useEffect(() => {
    const code = getQueryString('code');
    initUser(code);
  }, []);

  const initUser = async (code: string | null) => {
    try {
      const result = await fetchToken({ code: code as string });
      const oauthInfo = JSON.parse(window.atob(result.data.token));
      setLocal('access_token', oauthInfo.access_token);
      setLocal('expires_in', `${Date.now() + oauthInfo.expires_in * 1000}`);
      setLocal('refresh_token', oauthInfo.refresh_token);
      console.log('oauthInfo', oauthInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyleContainer>
      <Helmet>
        <title>登录跳转</title>
      </Helmet>
      <Space size="large">
        <Spin size="large" />
      </Space>
      <p>跳转中...</p>
    </StyleContainer>
  );
});
