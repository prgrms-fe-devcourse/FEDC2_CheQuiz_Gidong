import styled from '@emotion/styled';

interface StyledSelectButtonProps {
  currentSelected: boolean;
}

export const SelectButton = styled.button<StyledSelectButtonProps>`
  background-color: ${({ currentSelected }) =>
    currentSelected ? 'blue' : 'gray'};
`;
