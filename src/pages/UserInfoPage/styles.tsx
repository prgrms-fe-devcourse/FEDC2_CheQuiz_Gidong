/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import { borderRadius, DarkGray, h2 } from '@/styles/theme';

export const notFoundText = styled.h2`
  /* display: flex; */
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  height: 35rem;
  ${h2}
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SettingDiv = styled.div`
  float: right;
`;

export const SettingButton = styled.button`
  display: block;
  position: relative;
  right: 1.5rem;
  margin: 1rem 0;
  width: 8rem;
  height: 2.5rem;
  border: 3px solid ${DarkGray};
  border-radius: ${borderRadius};
  transform: perspective(300px) rotateY(-25deg);
  background-color: #56caa7;
  cursor: pointer;
  &:nth-of-type(1) {
    transform: rotateY(-20deg);
    background-color: #ffd756;
    right: 0.9rem;
  }
  &:hover {
    filter: brightness(110%);
  }
`;
