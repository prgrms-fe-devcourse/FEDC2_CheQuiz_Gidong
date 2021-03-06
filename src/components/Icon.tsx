/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import styled from '@emotion/styled';
import { Buffer } from 'buffer';
import { icons } from 'feather-icons';

type propsType = {
  name: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  rotate?: number;
  fill?: boolean;
  addStyle?: {
    [x: string]: unknown;
  };
  [x: string]: unknown;
};

const IconWrapper = styled.i`
  display: inline-block;
`;

function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  color = '#222',
  rotate = 0,
  fill,
  addStyle,
  ...props
}: propsType) {
  const iconStyle = {
    'stroke-width': strokeWidth,
    stroke: color,
    width: size,
    height: size,
    fill: fill ? color : 'none',
  };
  const shapeStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };
  const icon = icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const base64 = Buffer.from(svg, 'utf8').toString('base64');
  return (
    <IconWrapper style={{ ...shapeStyle, ...addStyle }} {...props}>
      <img alt={name} src={`data:image/svg+xml;base64,${base64}`} />
    </IconWrapper>
  );
}

export default Icon;
