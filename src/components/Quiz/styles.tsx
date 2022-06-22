import styled from '@emotion/styled';
import { primary, pointColor, h2 } from '@/styles/theme';
import maple from '@/assets/maple.png';

interface SelectButtonProps {
  currentSelected: boolean;
}

interface StyledWrapperProps {
  margin?: number;
}

export const OuterBox = styled.div`
  color: ${primary};
`;

export const InnerBox = styled.div`
  height: 15rem;
  margin: 0 auto;
  padding: 2rem;

  border: 3px solid ${primary};
  border-radius: 0.5rem;

  background: url(${maple}) 98% 100% /6% no-repeat white;
  overflow-y: auto;

  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Title = styled.div`
  line-height: 1.4;
  font-size: 1.25rem;
`;

export const SelectButton = styled.button<SelectButtonProps>`
  width: 25%;
  padding: 0.5rem 1rem;

  font-size: 1.5rem;
  border: 3px solid ${primary};
  border-radius: 0.5rem;
  background-color: ${({ currentSelected }) =>
    currentSelected ? pointColor : 'white'};

  outline: none;
  cursor: pointer;
`;

export const Sign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.5rem;

  ${h2};
  color: ${pointColor};
  font-family: 'MaplestoryOTFBold', sans-serif !important;
`;

export const Wrapper = styled.div<StyledWrapperProps>`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)} 0;
`;
