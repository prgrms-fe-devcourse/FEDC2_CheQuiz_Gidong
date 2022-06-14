import styled from '@emotion/styled';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 3.5rem;
  width: 100%;
  border-bottom: 3px solid #343a40;
  background-color: #f8f9fa;
`;

// header : fixed에 의한 레이아웃 용
const HeaderSpacer = styled.div`
  height: 3.5rem;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-family: 'Permanent Marker', sans-serif;
  font-size: 2rem;
  color: #fca311;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

const Button = styled.a`
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

export { HeaderContainer, ContentContainer, Title, Button, HeaderSpacer };
