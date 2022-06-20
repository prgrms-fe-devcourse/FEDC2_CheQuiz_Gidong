import * as S from './styles';
import { getUserImageByPoints } from '@/utils/getUserImage';

interface QuizSetCardProps {
  quizSet: any;
}
function QuizSetCard({ quizSet }: QuizSetCardProps) {
  const { description, name } = quizSet;
  const { tags, des, creator } = JSON.parse(description);
  const points = JSON.parse(creator?.username || null)?.points || 1000;

  return (
    <S.CardContainer>
      <S.QuizBox>
        <S.Title>{name}</S.Title>
        <S.TagBox>
          <S.Tag order={0}>난이도 n</S.Tag>
          {tags.map((t: any, idx: number) => (
            <S.Tag key={t} order={idx + 1}>
              {t}
            </S.Tag>
          ))}
        </S.TagBox>
        <S.Description>{des}</S.Description>
      </S.QuizBox>
      <S.UserBox>
        <S.UserName>{creator.fullName || '익명의 사용자'}</S.UserName>
        <S.UserImageWrapper>
          <S.UserImage src={getUserImageByPoints(points)} alt="userImage" />
        </S.UserImageWrapper>
      </S.UserBox>
    </S.CardContainer>
  );
}

export default QuizSetCard;
