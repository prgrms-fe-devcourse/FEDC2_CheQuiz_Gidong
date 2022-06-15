import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import * as S from './styles';

interface LinkButtonProps extends S.StyledLinkedButtonProps {
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
    <S.LinkButton
      type={type}
      color={color}
      fill={fill}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </S.LinkButton>
  );
}

export default LinkButton;
