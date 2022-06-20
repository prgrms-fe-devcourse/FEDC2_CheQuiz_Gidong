import styled from '@emotion/styled';

type tabItemProps = {
  selected?: boolean;
};

export const TabItemWrapper = styled.button<tabItemProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3rem;
  margin-right: 0.5rem;
  border: 3px solid #343a40;
  border-radius: 8px;
  color: ${({ selected }) => (selected ? '#f8f9fa' : 'black')};
  background-color: ${({ selected }) => (selected ? `#14213D` : `white`)};
  font-family: 'MaplestoryOTFLight', sans-serif;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#14213D' : '#E9ECEF')};
  }
`;
