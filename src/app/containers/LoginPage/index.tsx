/**
 *
 * LoginPage
 *
 */

import React, { memo, useState } from 'react';
import { Button } from 'antd';
import { Helmet } from 'react-helmet-async';

import { StyleContainer, StyleTitleP } from './style';

interface Props {}

export const LoginPage = memo((props: Props) => {
  const [requesting, setRequesting] = useState(false);

  const handleLoginRequest = async () => {
    setRequesting(true);
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
