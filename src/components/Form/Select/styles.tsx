/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import arrowIcon from '@/assets/downArrow.png';
import { DarkGray, small } from '@/styles/theme';

// eslint-disable-next-line import/prefer-default-export
export const SelectBox = styled.select`
  width: 10rem;
  height: 2.5rem;
  padding: 0.25rem 2rem;
  font-family: 'MaplestoryOTFLight';
  ${small};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  box-sizing: border-box;
  appearance: none;
  outline: none;
  background: url(${arrowIcon}) 95.5% center/10% no-repeat;
  cursor: pointer;
`;
