/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export interface StyledLinkedButtonProps {
  color: 'point' | 'primary' | 'secondary';
  fill?: 'true' | 'false';
  fullWidth?: 'true' | 'false';
  logo?: 'true' | 'false';
}

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 3.5rem;
  width: 100%;
  border-bottom: 3px solid #343a40;
  background-color: #f8f9fa;
  z-index: 3;
  box-sizing: content-box;
`;

// header : fixed에 의한 레이아웃 용
export const HeaderSpacer = styled.div`
  height: 3.5rem;
  width: 100%;
`;

export const ContentContainer = styled.div`
  height: inherit;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
`;

export const LinkButton = styled(Link)<StyledLinkedButtonProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  display: ${({ fullWidth }) => (fullWidth ? 'block' : 'inline-block')};
  font-family: ${({ logo }) =>
    logo === 'true' ? `'Permanent Marker', sans-serif` : null};
  font-size: ${({ logo }) => (logo === 'true' ? '2rem' : '1rem')};
  text-shadow: ${({ logo }) =>
    logo === 'true'
      ? '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'
      : null};
  padding: 0 1rem;
  border: none;
  background-color: ${({ color, fill }) => {
    if (!fill) return '#f8f9fa';
    if (color === 'point') return '#fca211';
    if (color === 'primary') return '#14213d';
    return '#e5e5e5';
  }};
  color: ${({ color, fill }) => {
    if (fill) return '#f8f9fa';
    if (color === 'point') return '#fca211';
    if (color === 'primary') return '#14213d';
    return '#e5e5e5';
  }};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #fca311;
  }
`;

export const Button = styled.button`
  display: inline-block;
  text-align: center;
  padding: 0 1rem;
  font-family: 'MaplestoryOTFLight', 'Segoe UI', 'Apple SD Gothic Neo',
    'Noto Sans KR', 'Malgun Gothic', sans-serif;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  font-size: 1rem;
  text-decoration: none;
  color: #343a40;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #fca311;
  }
`;
