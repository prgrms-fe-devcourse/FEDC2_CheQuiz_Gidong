import { useContext } from 'react';

import { ModalDispatchContext } from './ModalContext';

export default function useModals() {
  const { open, close } = useContext(ModalDispatchContext);

  const openModal = (Component: React.ElementType, props: any) => {
    open(Component, props);
  };

  const closeModal = (Component: React.ElementType) => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
  };
}
