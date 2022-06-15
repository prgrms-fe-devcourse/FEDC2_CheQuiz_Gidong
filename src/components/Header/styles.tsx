import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 3.5rem;
  width: 100%;
  border-bottom: 3px solid #343a40;
  background-color: #f8f9fa;
`;

// header : fixed에 의한 레이아웃 용
export const HeaderSpacer = styled.div`
  height: 3.5rem;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  font-family: 'Permanent Marker', sans-serif;
  font-size: 2rem;
  color: #fca311;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

export const Button = styled.a`
  display: inline-block;
  text-align: center;
  font-family: 'MaplestoryOTFLight', 'Segoe UI', 'Apple SD Gothic Neo',
    'Noto Sans KR', 'Malgun Gothic', sans-serif;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 1rem;
  text-decoration: none;
  color: #343a40;
  cursor: pointer;
  width: 100px;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #fca311;
  }
`;
