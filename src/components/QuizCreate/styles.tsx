/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import { DarkGray, pointColor } from '@/styles/theme';

export const FormContainer = styled.form`
  width: 100%;
  margin-top: 7rem;
`;

export const SubmitButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;

  width: 7.5rem;
  height: 3rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${pointColor};
  text-align: center;
  font-family: 'MaplestoryOTFBold', sans-serif !important;
  cursor: pointer;
`;
