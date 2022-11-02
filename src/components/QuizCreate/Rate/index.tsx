/* eslint-disable @emotion/syntax-preference */
import { useState } from 'react';

import styled from '@emotion/styled';

import Icon from '@/components/Icon';

interface RateProps {
  count: number;
  defaultVal: number;
  onChangeStar?: (value: number) => void;
  size?: number;
  [x: string]: unknown;
}

const Rate = ({
  count,
  defaultVal,
  onChangeStar,
  size = 40,
  ...props
}: RateProps) => {
  const [currVal, setCurrVal] = useState(defaultVal);

  const handleStarClick = (clickedVal: number) => {
    let value = clickedVal;

    if (currVal === clickedVal) {
      value -= 1;
      setCurrVal(value);
    } else {
      setCurrVal(clickedVal);
    }

    if (onChangeStar) onChangeStar(value);
  };
  return (
    <RateWrapper {...props}>
      {Array.from({ length: count }, (_, i) => i + 1).map((starVal) => (
        <Star
          key={starVal}
          onClick={() => handleStarClick(starVal)}
        >
          {starVal <= currVal ? (
            <Icon
              fill
              name='star'
              size={size}
            />
          ) : (
            <Icon
              name='star'
              size={size}
            />
          )}
        </Star>
      ))}
    </RateWrapper>
  );
};

export default Rate;

const RateWrapper = styled.div`
  display: flex;
`;
const Star = styled.div``;
