import { UserQuizType } from '@/interfaces/UserAPI';
import { getUserImageByPoints } from '@/utils/getUserImage';
import * as S from './styles';

interface Props {
  quiz: UserQuizType;
  isShown: boolean;
  onClose: () => void;
}

function QuizModal({ quiz, isShown, onClose }: Props) {
  return (
    <>
      {isShown && (
        <S.Wrapper onClick={onClose}>
          <S.Container onClick={(e) => e.stopPropagation()}>
            <S.Title>퀴즈 자세히 보기</S.Title>
            <S.SectionContainer>
              <S.SectionTitle>질문</S.SectionTitle>
              <S.Question>{quiz.question}</S.Question>
            </S.SectionContainer>

            <S.SectionContainer>
              <S.SectionTitle>
                정답 <span> {quiz.answer === 'true' ? 'O' : 'X'}</span>
              </S.SectionTitle>
              <S.Answer>{quiz.answerDescription}</S.Answer>
            </S.SectionContainer>

            {quiz.comments.length > 0 && (
              <S.SectionContainer>
                <S.SectionTitle>댓글</S.SectionTitle>
                <S.CommentContainer>
                  {quiz.comments.map((comment) => (
                    <S.CommentItem key={comment._id}>
                      <S.UserImage
                        src={getUserImageByPoints(
                          comment.author.username
                            ? JSON.parse(comment.author.username).points
                            : 0,
                        )}
                        alt="userImage"
                      />
                      <S.CommentContent>
                        <S.CommentUsername>
                          {comment.author.fullName}
                        </S.CommentUsername>
                        <S.CommentUsercomment>
                          {comment.comment}
                        </S.CommentUsercomment>
                      </S.CommentContent>
                    </S.CommentItem>
                  ))}
                </S.CommentContainer>
              </S.SectionContainer>
            )}

            <S.ButtonContainer>
              <S.CloseButton type="button" onClick={onClose}>
                X
              </S.CloseButton>
            </S.ButtonContainer>
          </S.Container>
        </S.Wrapper>
      )}
      {!isShown && null}
    </>
  );
}

export default QuizModal;
