import { createContext } from 'react';

export interface ModalState {
  Component: React.ElementType;
  props: any;
}
export const ModalsStateContext = createContext<ModalState[]>([]);
export const ModalDispatchContext = createContext({
  open: (Component: React.ElementType, props: any) => {},
  close: (Component: React.ElementType) => {},
});
