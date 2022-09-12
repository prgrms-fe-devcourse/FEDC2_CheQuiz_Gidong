/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import theme from '@/styles/theme';

interface ItemProps {
  padding?: string;
}

export const Notification = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  height: 300px;
  overflow: auto;
  position: absolute;
  top: 3.5rem;
  right: 0;
  background-color: #fff;
  border: 3px solid ${theme.themeColors.primary};
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const Item = styled.div<ItemProps>`
  padding: ${({ padding = `1rem 0.7rem` }) => padding};
  border-bottom: 1px solid ${theme.textAndBackGroundColor.lightGray};
  color: ${theme.textAndBackGroundColor.DarkGray};
  font-size: 0.9rem;
`;

export const Button = styled.button`
  width: fit-content;
  padding: 0.3rem 0.6rem;
  background-color: ${theme.themeColors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;
