import Icon from '@/components/Icon';
import * as S from './styles';

interface QuizItemProps {
  question: string;
  likeCount: number;
  commentCount: number;
}

const likeIconProps = {
  name: 'thumbs-up',
  size: 20,
  strokeWidth: 2,
  color: '#343A40',
  rotate: 0,
};

const commentIconProps = {
  name: 'message-square',
  size: 20,
  strokeWidth: 2,
  color: '#343A40',
  rotate: 0,
};

function UserQuizItem({ question, likeCount, commentCount }: QuizItemProps) {
  return (
    <S.ItemWrapper>
      <S.ContentWrapper>
        <S.QuestionSymbol>Q.</S.QuestionSymbol>
        <S.QuestionText>{question}</S.QuestionText>
      </S.ContentWrapper>

      <S.CountWrapper>
        <S.CountItem>
          <Icon {...likeIconProps} />
          {likeCount}
        </S.CountItem>
        <S.CountItem>
          <Icon {...commentIconProps} />
          {commentCount}
        </S.CountItem>
      </S.CountWrapper>
    </S.ItemWrapper>
  );
}

export default UserQuizItem;
