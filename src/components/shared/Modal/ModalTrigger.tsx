import type React from 'react';

import styled from '@emotion/styled';

import { useModalContext } from './ModalProvider';

interface Props {
  children: React.ReactNode;
}

const ModalTrigger = ({ children }: Props) => {
  const { openModal } = useModalContext();

  return <Trigger onClick={openModal}>{children}</Trigger>;
};

export default ModalTrigger;

const Trigger = styled('div')({});
