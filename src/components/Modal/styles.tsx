/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import {
  borderRadius,
  DarkGray,
  detail,
  grayWhite,
  lightGrayWhite,
  medium,
  p,
  pointColor,
  small,
} from '@/styles/theme';

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1c1c1cc7;
  z-index: 10;
`;

export const Container = styled.div`
  width: 40rem;
  padding: 3rem;
  margin: auto;
  position: relative;

  background-color: ${lightGrayWhite};
  border-radius: ${borderRadius};
  text-align: left;
`;

export const Title = styled.h3`
  padding-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Label = styled.label`
  display: block;
  padding-bottom: 0.5rem;
`;

export const TextInput = styled.input`
  display: block;
  width: 100%;
  height: 3.25rem;

  padding: 1rem;
  margin-bottom: 0.5rem;

  border-radius: ${borderRadius};
  border: 3px solid ${DarkGray};
  ${small}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const ButtonInput = styled.input`
  display: block;
  width: 8rem;
  height: 2.5rem;

  background-color: ${pointColor};
  border-radius: ${borderRadius};
  border: 3px solid ${DarkGray};
  ${small};
  cursor: pointer;
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${pointColor};
  border-radius: ${borderRadius};
  border: 3px solid ${DarkGray};
  ${medium};
  cursor: pointer;
`;
export const SectionContainer = styled.div`
  padding: 0.5rem 0;
`;
export const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Question = styled.p`
  font-family: Pretendard, sans-serif;
  ${small}
`;

export const Answer = styled.div`
  padding: 1rem;
  background-color: ${grayWhite};
  border-radius: 8px;
  font-family: Pretendard, sans-serif;
  ${detail}
`;
export const CommentItem = styled.div`
  display: flex;
`;

export const UserImage = styled.img`
  background-color: #dee2e6;
  border-radius: 3px;
  padding: 0.5rem;
`;
export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
`;
export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CommentUsername = styled.span`
  ${p}
`;

export const CommentUsercomment = styled.p`
  ${detail}
`;
