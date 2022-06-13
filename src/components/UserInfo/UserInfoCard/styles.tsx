import styled from '@emotion/styled';

const Card = styled.div`
  background-color: #f8f9fa;
  //TODO: 색 의견 물어보기
  /* background-color: #e3d9ff; */
  color: #212529;
  border: 3px solid;
  border-radius: 8px;
  box-sizing: border-box;
`;

const UserCard = styled(Card)`
  position: relative;
  top: 2rem;
  display: flex;
  width: 40rem;
  padding: 1rem;
`;

const Username = styled.h2`
  font-size: 1.25rem;
  font-family: 'MaplestoryOTFLight', sans-serif !important;
  margin-top: 0.5rem;
`;

const UserImage = styled.img`
  width: 6rem;
  height: 6rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 3px solid;
  border-radius: 8px;
  box-sizing: border-box;
  color: inherit;
  background-color: #e9ecef;
`;

const UserBasicContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
`;

const UserRankContent = styled.div`
  flex: 1;
`;

const Rank = styled.h3`
  font-size: 1.5rem;
  font-family: 'MaplestoryOTFBold', sans-serif !important;
  border: 3px solid;
  padding: 0.5rem;
  width: 10rem;
  border-radius: 8px;
  background-color: white;
`;

const ExpWrapper = styled.div`
  padding-top: 1rem;
  height: 1.25rem;
`;

const ExpContainer = styled(Card)`
  width: 100%;
  height: 1.25rem;
  position: relative;
  background-color: white;
`;

const ExpCurrentContainer = styled(Card)`
  width: ${({ percent }: { percent: number }) => `${percent + 1}%`};
  height: 1.25rem;
  position: absolute;
  top: -3px;
  left: -3px;
  background-color: #ffdc84;
`;

const ExpDetail = styled.span`
  color: #495057;
  z-index: 3;
  position: absolute;
  top: -1rem;
  right: 0px;
  font-family: 'MaplestoryOTFLight', sans-serif !important;
  font-size: 0.8rem;
`;

const BadgeContent = styled.div`
  position: relative;
  padding-top: 1rem;
`;

const Badge = styled.span`
  display: inline-block;
  background-color: ${({ color }: { color: string }) => color};
  color: #212529;
  border: 3px solid;
  border-radius: 8px;
  box-sizing: border-box;
  font-family: 'MaplestoryOTFLight', sans-serif !important;
  padding: 0.25rem 1rem;
  margin: 0.25rem;
`;

export {
  Card,
  UserCard,
  Username,
  UserImage,
  UserBasicContent,
  UserRankContent,
  Rank,
  ExpContainer,
  ExpCurrentContainer,
  ExpWrapper,
  ExpDetail,
  BadgeContent,
  Badge,
};
