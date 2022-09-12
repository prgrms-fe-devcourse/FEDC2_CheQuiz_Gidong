import Icon from '@/components/Icon';

import * as S from './styles';

interface QuizItemProps {
  question: string;
  likeCount: number;
  commentCount: number;
  handleClick: () => void;
}

const IconProps = {
  name: '',
  size: 20,
  strokeWidth: 2,
  color: '#343A40',
  rotate: 0,
};

const UserQuizItem = ({
  question,
  likeCount,
  commentCount,
  handleClick,
}: QuizItemProps) => {
  const renderCount = (currentCount: number, maxCount: number) => {
    if (currentCount > maxCount) {
      return `${maxCount}+`;
    }
    return `${currentCount}`;
  };
  return (
    <S.ItemWrapper onClick={handleClick}>
      <S.ContentWrapper>
        <S.QuestionSymbol>Q.</S.QuestionSymbol>
        <S.QuestionText>{question}</S.QuestionText>
      </S.ContentWrapper>

      <S.CountWrapper>
        <S.CountItem>
          <Icon
            {...IconProps}
            name='thumbs-up'
          />
          {renderCount(likeCount, 100)}
        </S.CountItem>
        <S.CountItem>
          <Icon
            {...IconProps}
            name='message-square'
          />
          {renderCount(commentCount, 100)}
        </S.CountItem>
      </S.CountWrapper>
    </S.ItemWrapper>
  );
};

export default UserQuizItem;
