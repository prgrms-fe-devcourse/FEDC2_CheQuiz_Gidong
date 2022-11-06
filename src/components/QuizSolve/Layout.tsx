import type { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

interface Props extends HTMLAttributes<HTMLElement> {
  backgroundColor?: string;
}

const Layout = ({ backgroundColor, children, ...props }: Props) => (
  <div {...props}>
    {backgroundColor && <Background backgroundColor={backgroundColor} />}
    {children}
  </div>
);

export default Layout;

const Background = styled.div<Props>(
  {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  ({ backgroundColor }) => ({
    backgroundColor,
  })
);
