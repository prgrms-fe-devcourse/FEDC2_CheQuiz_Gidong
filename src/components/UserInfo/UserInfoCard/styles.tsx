import styled from '@emotion/styled';

import { gray } from '@/styles/theme';

type CardProps = {
  width: string;
};

export const Card = styled.div`
  background-color: #f8f9fa;
  //TODO: 색 의견 물어보기
  color: #212529;
  border: 3px solid;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const UserCard = styled(Card)<CardProps>`
  display: flex;
  position: relative;
  width: ${(props) => props.width};
  height: 14rem;
  padding: 1rem;
  margin-top: 1rem;
  z-index: 1;
`;

export const Username = styled.h2`
  font-size: 1.25rem;
  font-family: 'MaplestoryOTFLight', sans-serif !important;
  margin-top: 0.5rem;
`;

export const UserImage = styled.img`
  max-height: 5.5rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.5rem;
  border: 3px solid;
  border-radius: 8px;
  box-sizing: border-box;
  color: inherit;
  background-color: #e9ecef;
`;
export const LevelText = styled.h2`
  font-size: 1.25rem;
  font-family: 'MaplestoryOTFBold', sans-serif !important;
  margin-top: 0.5rem;
`;
export const UserBasicContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
`;

export const UserRankContent = styled.div`
  flex: 1;
`;

export const Rank = styled.h3`
  font-size: 1.5rem;
  font-family: 'MaplestoryOTFBold', sans-serif !important;
  border: 3px solid;
  padding: 0.5rem;
  width: 10rem;
  border-radius: 8px;
  background-color: white;
`;

export const ExpWrapper = styled.div`
  padding-top: 1rem;
  height: 1.25rem;
`;

export const ExpContainer = styled(Card)`
  width: 100%;
  height: 1.25rem;
  position: relative;
  background-color: white;
`;

export const ExpCurrentContainer = styled(Card)`
  width: ${({ percent }: { percent: number }) => `${percent + 1}%`};
  height: 1.25rem;
  position: absolute;
  top: -3px;
  left: -3px;
  background-color: #ffdc84;
`;

export const ExpDetail = styled.span`
  color: #495057;
  position: absolute;
  top: -1rem;
  right: 0px;
  font-family: 'MaplestoryOTFLight', sans-serif !important;
  font-size: 0.8rem;
`;

export const BadgeContent = styled.div`
  position: relative;
  padding-top: 1rem;
`;

export const Badge = styled.span`
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

export const SettingContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${gray};
`;

export const SettingButton = styled.span`
  cursor: pointer;
`;
