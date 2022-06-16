import React from 'react';
import * as S from './styles';

interface SliderButtonProps extends S.StyledSliderButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
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
