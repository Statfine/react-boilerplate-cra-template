import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { StyleWrapperDiv, StyleTitleDiv } from 'app/components/NotFoundPage/P';
import { Button } from 'antd';

import { selectLogined } from '../App/selectors';

export function HomePage() {
  let history = useHistory();

  const userLogined = useSelector(selectLogined);

  const handleJump = () => {
    history.push(userLogined ? 'user' : 'login');
  };

  return (
    <StyleWrapperDiv>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <StyleTitleDiv>
        <span>Wellcome</span>
      </StyleTitleDiv>
      <Button
        type="primary"
        size="large"
        style={{ width: '368px' }}
        onClick={handleJump}
      >
        {userLogined ? '用户页面' : '跳转登录页面'}
      </Button>
    </StyleWrapperDiv>
  );
}
