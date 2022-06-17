import React from 'react';
import * as S from './styles';

export interface SliderButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  color: 'point' | 'primary' | 'secondary';
  [extraProps: string]: unknown;
}

function SliderButton({
  color,
  onClick,
  children,
  disabled,
  className,
  ...props
}: SliderButtonProps) {
  return (
    <S.SliderButton
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </S.SliderButton>
  );
}

export default SliderButton;
