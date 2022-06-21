import styled from '@emotion/styled';

// TODO: 임시 prop 바꾸기
interface StyledButtonProps {
  color?: 'point' | 'primary' | 'secondary';
  fullWidth?: boolean;
}

interface StyledSignProps {
  reverse?: boolean;
  color: 'blue' | 'red' | 'default';
}

interface ProfileImageProps {
  src?: string;
}
export interface StyledQuizResultProps {
  correct: boolean;
}

export const Box = styled.div`
  margin: 1rem 0;
  border: 3px solid #14213d;
  border-radius: 0.5rem;
  * {
    box-sizing: border-box;
    font-family: 'MaplestoryOTFLight';
  }
`;

export const Wrapper = styled(Box)`
  margin: 1rem 0;
  padding: 0.5rem;
`;

export const Container = styled.div`
  margin: 0 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem;
  border-bottom: 3px solid #14213d;
  transition: border 0.35s ease-in-out;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1rem;
`;

export const HeaderRight = styled.div`
  display: flex;
  height: 100%;

  button {
    display: block;
    height: 100%;
    border: none;
    background-color: rgba(252, 163, 17, 0.2);
    font-weight: bold;
    outline: none;
    cursor: pointer;

    :last-of-type {
      border-top-right-radius: 0.5rem;
    }

    :hover {
      background-color: rgba(252, 163, 17, 0.3);
    }
  }
`;

export const Sign = styled.div<StyledSignProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  border: ${({ reverse }) => (reverse ? `1px solid #14213d` : 'none')};
  border-radius: 0.5rem;
  background-color: ${({ reverse, color }) => {
    if (!reverse) return '#ffffff';
    if (color === 'blue') return 'royalblue';
    if (color === 'red') return 'tomato';
    return '#14123d';
  }};
  color: ${({ reverse, color }) => {
    if (reverse) return '#ffffff';
    if (color === 'blue') return 'royalblue';
    if (color === 'red') return 'tomato';
    return '#14123d';
  }};
  font-size: 2rem;
  font-weight: bold;
`;

export const Text = styled.span`
  line-height: 1.4;
`;

export const Comment = styled(Wrapper)`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

export const UserImage = styled.img`
  max-height: 5.5rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border: 3px solid;
  border-radius: 8px;
  box-sizing: border-box;
  color: inherit;
  background-color: #e9ecef;
`;

export const CommentCenter = styled.div`
  flex: 1;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TextInput = styled.input`
  flex: 1;
  display: block;
  padding: 0.5rem;
  border: 3px solid #14213d;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
`;

export const InputWrapper = styled(Wrapper)`
  flex: 1;
  margin: 0;
  :hover {
    border-color: #565656;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 1rem;
  outline: none;
`;

export const Button = styled.button<StyledButtonProps>`
  padding: 0.5rem;
  border: 3px solid #14213d;
  border-radius: 0.5rem;
  background-color: ${({ color }) => {
    if (color === 'point') return '#fca211';
    if (color === 'primary') return '#14213d';
    return '#e5e5e5';
  }};
  outline: none;
  cursor: pointer;
  :hover {
    // TODO: 각 color 마다 추가 작업 필요
    background-color: #fca211d9;
  }

  :disabled {
    cursor: default;
  }
`;
