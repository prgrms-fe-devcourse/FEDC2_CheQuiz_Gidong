import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import * as Styled from './styles';

interface LinkButtonProps extends Styled.StyledLinkedButtonProps {
  to: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

function LinkButton({
  to,
  children,
  type,
  color,
  fill,
  fullWidth,
}: LinkButtonProps) {
  const history = useHistory();
  const onClick = useCallback(() => {
    history.push(to);
  }, [history, to]);
  return (
    <Styled.LinkButton
      type={type}
      color={color}
      fill={fill}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </Styled.LinkButton>
  );
}

export default LinkButton;
