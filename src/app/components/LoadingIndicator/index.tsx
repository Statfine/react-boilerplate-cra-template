/**
 *
 * LoadingIndicator
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Spin } from 'antd';

interface StyleWrapperProps {
  position?: string | undefined;
}

// 写法一
// const StyleWrapper = styled.div<StyleWrapperProps>`
//   display: flex;
//   justify-content: ${props => props.position};
//   align-items: center;
// `;

// 写法二
const StyleWrapper = styled.div<{ position?: string }>`
  display: flex;
  justify-content: ${props => props.position};
  align-items: center;
`;

export const LoadingIndicator = memo(
  (props: StyleWrapperProps = { position: 'center' }) => {
    return (
      <StyleWrapper position={props.position}>
        <Spin size="large" />
      </StyleWrapper>
    );
  },
);
