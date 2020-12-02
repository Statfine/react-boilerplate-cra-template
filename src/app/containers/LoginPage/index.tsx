/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import { DatePicker, message } from 'antd';

import { StyleContainer } from './style';

interface Props {}

export const LoginPage = memo((props: Props) => {
  const handleChange = value => {
    message.info(
      `您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`,
    );
  };

  return (
    <>
      <StyleContainer>LoginPage</StyleContainer>
      <DatePicker onChange={handleChange} />
    </>
  );
});
