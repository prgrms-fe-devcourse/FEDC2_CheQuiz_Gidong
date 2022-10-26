import React from 'react';

interface ModalContextProps {
  modalState: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = React.createContext({});

export const useModalContext = () =>
  React.useContext(ModalContext) as ModalContextProps;

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalState, setModalState] = React.useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const ctx: ModalContextProps = React.useMemo(
    () => ({
      modalState,
      openModal,
      closeModal,
    }),
    [modalState]
  );

  return <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
