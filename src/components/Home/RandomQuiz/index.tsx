import { QUIZ_CATEGORY_LIST } from '@/constants';
import { useQuizContext } from '@/contexts/QuizContext';
import * as S from './styles';

function RandomQuiz() {
  const { setRandomQuizCount, setRandomQuizCategory } = useQuizContext();

  return (
    <S.Container>
      <S.TitleBox>
        <S.Title>내가 만드는 일일 퀘스트</S.Title>
        <S.RoundShapeBox />
      </S.TitleBox>
      <S.ContentBox>
        <S.Content>
          <S.Text>
            퀘스트 요약 |
            <S.CategorySelect
              name="orders"
              onChange={({ target }) => setRandomQuizCategory(target.value)}
            >
              <option value="" hidden>
                ( 카테고리 )
              </option>
              {QUIZ_CATEGORY_LIST.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </S.CategorySelect>
            의 문제를
            <S.Input
              type="number"
              min={1}
              max={10}
              placeholder="( 문제 수 )"
              onChange={({ target }) =>
                setRandomQuizCount(Number(target.value))
              }
            />
            만큼 풀게나!
          </S.Text>
          <S.Text>보상 | 소정의 경험치 획득 </S.Text>
        </S.Content>
        <S.StartBox to="/solve">
          <S.Text type="small">퀘스트 수행하러</S.Text>
          <S.BoldText>Go!</S.BoldText>
        </S.StartBox>
      </S.ContentBox>
    </S.Container>
  );
}

export default RandomQuiz;
