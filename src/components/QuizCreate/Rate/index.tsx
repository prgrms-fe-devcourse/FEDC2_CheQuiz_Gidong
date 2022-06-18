import { useState } from 'react';
import styled from '@emotion/styled';
import fullStar from '@/assets/fullStar.png';
import emptyStar from '@/assets/emptyStar.png';

interface RateProps {
  count: number;
  defaultVal: number;
  onChangeStar?: (value: number) => void;
  size?: number;
  [x: string]: unknown;
}

const RateWrapper = styled.div`
  display: flex;
`;
const Star = styled.div``;
function Rate({
  count,
  defaultVal,
  onChangeStar,
  size = 40,
  ...props
}: RateProps) {
  const [currVal, setCurrVal] = useState(defaultVal);

  const handleStarClick = (clickedVal: number) => {
    let value = clickedVal;

    if (currVal === clickedVal) {
      value -= 1;
      setCurrVal(value);
    } else {
      setCurrVal(clickedVal);
    }

    if (onChangeStar) {
      onChangeStar(value);
    }
  };
  return (
    <RateWrapper {...props}>
      {Array.from({ length: count }, (_, i) => i + 1).map((starVal) => (
        <Star key={starVal} onClick={() => handleStarClick(starVal)}>
          {starVal <= currVal ? (
            <img src={fullStar} width={size} alt="fullStar" />
          ) : (
            <img src={emptyStar} width={size} alt="emptyStar" />
          )}
        </Star>
      ))}
    </RateWrapper>
  );
}

export default Rate;
