import { useContext, lazy, Suspense } from 'react';

import { ModalDispatchContext, ModalsStateContext } from './ModalContext';

export const modals = {
  login: lazy(() => import('@/components/LoginForm')),
  signup: lazy(() => import('@/components/SignUpForm')),
};

const Modals = () => {
  const opendModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalDispatchContext);

  return (
    <>
      {opendModals.map((modal, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { Component, props } = modal;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react/prop-types
        const { onSubmit, ...restProps } = props;
        const onClose = () => {
          close(Component);
        };

        return (
          <Suspense>
            <Component
              {...restProps}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClose={onClose}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              onSubmit={onSubmit}
            />
          </Suspense>
        );
      })}
    </>
  );
};
export default Modals;
