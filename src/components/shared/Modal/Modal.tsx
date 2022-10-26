import type React from 'react';

import styled from '@emotion/styled';

import { useModalContext } from './ModalProvider';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const { modalState, closeModal } = useModalContext();

  return modalState ? (
    <Wrapper onClick={closeModal}>
      <Container onClick={(e) => e.stopPropagation()}>{children}</Container>
    </Wrapper>
  ) : null;
};

export default Modal;

export const Wrapper = styled('div')({
  position: 'fixed',
  zIndex: '10',
  top: '0',
  left: '0',
  display: 'flex',
  width: '100%',
  height: '100%',
  backgroundColor: '#1c1c1cc7',
});

export const Container = styled('div')(
  {
    position: 'relative',
    width: '40rem',
    padding: '3rem',
    margin: 'auto',
    textAlign: 'left',
  },
  ({ theme }) => ({
    backgroundColor: theme.textAndBackGroundColor.lightGrayWhite,
    borderRadius: theme.borderStyle.borderRadius,
  })
);
