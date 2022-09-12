import type React from 'react';

import * as S from './styles';

export interface SliderButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  color: 'point' | 'primary' | 'secondary';
  [extraProps: string]: unknown;
}

const SliderButton = ({
  color,
  onClick,
  children,
  disabled,
  className,
  ...props
}: SliderButtonProps) => (
  <S.SliderButton
    className={className}
    color={color}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    {children}
  </S.SliderButton>
);

export default SliderButton;
