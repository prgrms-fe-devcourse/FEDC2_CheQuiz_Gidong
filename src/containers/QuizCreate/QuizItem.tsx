import {
  QUIZ_ANSWER_TYPE_LIST,
  QUIZ_CATEGORY_LIST,
} from '@/assets/QuizCreateMockData';
import { DIFFICULTY_COUNT, IMPORTANCE_COUNT } from '@/common/number';
import { QuizClientContent } from '@/interfaces/Quiz';

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
    <div className="quiz" style={{ margin: '48px 0' }}>
      <button
        type="button"
        style={{ float: 'right' }}
        onClick={handleQuizDelete(quizData._id)}
      >
        퀴즈 삭제
      </button>
      <div className="question" style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        </div>
        <span>Q. 질문</span>
        <textarea
          value={quizData.question}
          onChange={handleInputChange('question')}
        />
      </div>
      <br />
      <div className="answer" style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <span>정답</span>
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
            <span>중요도</span>
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
            <span>난이도</span>
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
        </div>
        <span>해설</span>
        <textarea
          value={quizData.answerDescription}
          onChange={handleInputChange('answerDescription')}
        />
      </div>
    </div>
  );
}
