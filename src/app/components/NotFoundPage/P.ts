import styled from 'styled-components/macro';

export const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  margin: 0.625rem 0 1.5rem 0;
`;

export const StyleWrapperDiv = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

export const StyleTitleDiv = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
