import styled from '@emotion/styled';
import {
  borderRadius,
  DarkGray,
  lightGrayWhite,
  pointColor,
  small,
} from '@/styles/theme';

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
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
