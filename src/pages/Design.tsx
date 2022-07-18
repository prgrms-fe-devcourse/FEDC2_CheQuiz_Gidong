import { useState } from 'react';
import { Option, OptionWrap } from '@/designs/Option';
import { Select } from '@/designs/Select';
import { Text } from '@/designs/Text';
import { GREEN_800, PURPLE_600, RED_700 } from '@/foundations/colors';

function Design() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Text type="h1">텍스트</Text>
      <Text color={RED_700} type="h2">
        텍스트
      </Text>
      <Text type="h3">텍스트</Text>
      <Text color={GREEN_800} type="h4">
        텍스트
      </Text>
      <Text type="medium">텍스트</Text>
      <Text type="small">텍스트</Text>
      <Text>텍스트</Text>
      <Text type="detail">텍스트</Text>
      <Text color={PURPLE_600} weight="bold">
        텍스트
      </Text>
      <Text weight="medium">텍스트</Text>
      <Text weight="light">텍스트</Text>

      <Select
        color="white"
        backgroundColor="blue"
        width="100px"
        onClick={() => {
          setFlag(true);
        }}
      >
        선택옵션 👇
        <OptionWrap
          show={flag}
          hover="red"
          backgroundColor="skyblue"
          onClick={(e: React.MouseEvent<HTMLUListElement>) => {
            e.stopPropagation();
            setFlag(false);
          }}
        >
          <Option>테스트1</Option>
          <Option borderType="line">테스트2</Option>
          <Option borderType="dash">테스트3</Option>
          <Option borderType="dot">테스트4</Option>
        </OptionWrap>
      </Select>
    </div>
  );
}

export default Design;
