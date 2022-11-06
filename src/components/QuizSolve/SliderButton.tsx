import type { ButtonHTMLAttributes } from 'react';

import styled from '@emotion/styled';

import Icon from '../Icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'left' | 'right';
}

const SliderButton = ({ variant, ...props }: Props) => (
  <Button
    type='button'
    {...props}
  >
    {variant === 'left' ? <LeftIcon /> : <RightIcon />}
  </Button>
);

export default SliderButton;

const LeftIcon = () => (
  <Icon
    fill
    name='triangle'
    rotate={270}
    size={30}
  />
);

const RightIcon = () => (
  <Icon
    fill
    name='triangle'
    rotate={90}
    size={30}
  />
);

const Button = styled.button({
  alignSelf: 'flex-start',
  minHeight: '15rem',
  padding: '0 1rem',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  visibility: 'visible',
  userSelect: 'none',
  '&:disabled': {
    visibility: 'hidden',
    cursor: 'default',
  },
});
