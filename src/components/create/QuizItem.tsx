import styled from '@emotion/styled';
import { QuizClientContent } from '@/interfaces/Quiz';
import {
  DIFFICULTY_COUNT,
  IMPORTANCE_COUNT,
  QUIZ_ANSWER_TYPE_LIST,
  QUIZ_CATEGORY_LIST,
} from '@/constants';

const Wrapper = styled.div`
  margin: 48px 0;
`;
const QuestionSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
`;
const AnswerSection = styled.section`
  display: flex;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.div`
  font-size: 0.75rem;
`;

interface QuizItemProps {
  quizData: QuizClientContent;
  handleQuizDelete: (id: number) => (e: React.MouseEvent) => void;
  onChangeQuiz: (id: number, key: string, value: string) => void;
}

export default function QuizItem({
  quizData,
  onChangeQuiz,
  handleQuizDelete,
}: QuizItemProps) {
  const handleInputChange =
    (key: string) => (e: React.ChangeEvent | React.FormEvent) => {
      // TODO: debounce 걸어주어 리렌더링 최적화
      onChangeQuiz(quizData._id, key, (e.target as HTMLInputElement).value);
    };

  return (
    <Wrapper>
      <QuestionSection>
        <FlexCol>
          <select value={quizData.tag} onChange={handleInputChange('tag')}>
            <option value="" hidden>
              카테고리
            </option>
            {QUIZ_CATEGORY_LIST.map((opt) =>
              typeof opt === 'string' ? { label: opt, value: opt } : opt,
            ).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={quizData.answerType}
            onChange={handleInputChange('answerType')}
          >
            {QUIZ_ANSWER_TYPE_LIST.map((opt) => {
              return (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={!opt.canUse}
                >
                  {opt.label}
                </option>
              );
            })}
          </select>
        </FlexCol>
        <div>
          <Label>Q. 질문</Label>
          <textarea
            value={quizData.question}
            onChange={handleInputChange('question')}
          />
        </div>
        <button type="button" onClick={handleQuizDelete(quizData._id)}>
          퀴즈 삭제
        </button>
      </QuestionSection>
      <AnswerSection>
        <FlexCol>
          <div>
            <Label>정답</Label>
            {[
              { label: 'O', value: 'true' },
              { label: 'X', value: 'false' },
            ].map(({ label, value }) => (
              <div style={{ display: 'inline-block' }} key={value}>
                <input
                  type="radio"
                  id={value}
                  name={`answer_${quizData._id}`}
                  value={value}
                  onChange={handleInputChange('answer')}
                />
                <label htmlFor={value}> {label} </label>
              </div>
            ))}
          </div>
          <div>
            <Label>중요도</Label>
            {Array.from({ length: IMPORTANCE_COUNT }, (_, i) => i + 1).map(
              (id) => (
                <div style={{ display: 'inline-block' }} key={id}>
                  <input
                    type="radio"
                    id={String(id)}
                    name={`importance_${quizData._id}`}
                    value={id}
                    onChange={handleInputChange('importance')}
                  />
                  <label htmlFor={String(id)}> {`lv${id}`} </label>
                </div>
              ),
            )}
          </div>
          <div>
            <Label>난이도</Label>
            {Array.from({ length: DIFFICULTY_COUNT }, (_, i) => i + 1).map(
              (id) => (
                <div style={{ display: 'inline-block' }} key={id}>
                  <input
                    type="radio"
                    id={String(id)}
                    name={`difficulty_${quizData._id}`}
                    value={id}
                    onChange={handleInputChange('difficulty')}
                  />
                  <label htmlFor={String(id)}> {`lv${id}`} </label>
                </div>
              ),
            )}
          </div>
        </FlexCol>
        <div>
          <Label>해설</Label>
          <textarea
            value={quizData.answerDescription}
            onChange={handleInputChange('answerDescription')}
            style={{ height: '80%' }}
          />
        </div>
      </AnswerSection>
    </Wrapper>
  );
}
