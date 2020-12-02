/**
 *
 * LoginPage
 *
 */

import React, { memo, useState } from 'react';
import { Button } from 'antd';
import { Helmet } from 'react-helmet-async';
import { baseHost } from 'app/common/constants';

import { StyleContainer, StyleTitleP } from './style';
import { fetchLoginUrl } from './api';

interface Props {}

export const LoginPage = memo((props: Props) => {
  const [requesting, setRequesting] = useState(false);

  const handleLoginRequest = async () => {
    setRequesting(true);
    try {
      const params = {
        callback: `${baseHost}/uacsuc`,
        return_to: '/',
      };
      const { data } = await fetchLoginUrl(params);
      window.location.href = data.auth_url;
    } catch (e) {
      console.log(e);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <StyleContainer>
      <Helmet>
        <title>登录</title>
      </Helmet>
      <StyleTitleP>Hello Wellcome</StyleTitleP>
      <Button
        type="primary"
        size="large"
        style={{ width: '368px' }}
        onClick={handleLoginRequest}
        disabled={requesting}
      >
        立即登录
      </Button>
    </StyleContainer>
  );
});
