import { useState, useMemo } from 'react';

import { ModalsStateContext, ModalDispatchContext } from './ModalContext';
import Modals from './Modals';

import type { ModalState } from './ModalContext';

const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModals, setOpenModals] = useState<ModalState[]>([]);

  const open = (Component: React.ElementType, props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    setOpenModals((modals) => [...modals, { Component, props }]);
  };

  const close = (Component: React.ElementType) => {
    setOpenModals((modals) =>
      modals.filter((modal) => modal.Component !== Component)
    );
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openModals}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        <Modals />
      </ModalDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
