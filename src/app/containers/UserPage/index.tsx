/**
 *
 * UserPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { StyleWrapperDiv, StyleTitleDiv } from 'app/components/NotFoundPage/P';

import { selectUserInfo } from '../App/selectors';

interface Props {}

export const UserPage = memo((props: Props) => {
  const { name } = useSelector(selectUserInfo);

  return (
    <StyleWrapperDiv>
      <Helmet>
        <title>用户信息</title>
      </Helmet>
      <StyleTitleDiv>
        <span>Wellcome {name}</span>
      </StyleTitleDiv>
    </StyleWrapperDiv>
  );
});
