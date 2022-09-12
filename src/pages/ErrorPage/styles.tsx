/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import { borderRadius, h1, h2, large, primary, white } from '@/styles/theme';

export const ErrorContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* background-color: rgba(0, 0, 0, 0.7); */
`;

export const ErrorTitle = styled.h1`
  ${h1}
  font-weight: semi-bold;
  color: red;
`;

export const ErrorBody = styled.p`
  ${h2}
  font-weight: regular;
`;

export const ErrorImgBox = styled.div`
  width: 20%;
  margin: 3rem 0;

  img {
    width: 100%;
  }
`;

export const HomeButton = styled.button`
  background-color: ${primary};
  color: ${white};
  outline: none;
  border: none;
  border-radius: ${borderRadius};
  padding: 20px;
  ${large};
  margin-top: 30px;
  cursor: pointer;
`;
