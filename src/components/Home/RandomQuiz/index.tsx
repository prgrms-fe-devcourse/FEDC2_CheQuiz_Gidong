import React from 'react';
import { useHistory } from 'react-router';
import Select from '@/components/Form/Select';
import { QUIZ_CATEGORY_LIST } from '@/constants';
import { useQuizContext } from '@/contexts/QuizContext';
import * as S from './styles';

function RandomQuiz() {
  const {
    randomQuizCount,
    setRandomQuizCount,
    setRandomQuizCategory,
    setChannelId,
  } = useQuizContext();
  const history = useHistory();
  const SelectStyle = {
    width: '7rem',
    color: '#555555',
    padding: '0',
    margin: '0 1rem',
    border: 'none',
    appearance: 'auto',
    backgroundImage: 'none',
    backgroundColor: '#E9ECEF',
  };

  const handleQuizChange = (value: string) => {
    setRandomQuizCount(Number(value));
  };

  const handleQuizStart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!randomQuizCount) return;
    setChannelId(null);
    history.push('/solve');
  };

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
            <Select
              defaultValue="( 카테고리 )"
              options={QUIZ_CATEGORY_LIST}
              onChangeValue={(value: string) => setRandomQuizCategory(value)}
              addStyle={{ ...SelectStyle }}
            />
            의 문제를
            <S.Input
              type="number"
              min={1}
              max={10}
              placeholder="( 문제 수 )"
              onBlur={({ target }) =>
                target.value === '' &&
                target.setAttribute('placeholder', '문제수')
              }
              onFocus={({ target }) => target.setAttribute('placeholder', '')}
              onChange={({ target }) => handleQuizChange(target.value)}
            />
            만큼 풀게나!
          </S.Text>
          <S.Text>보상 | 소정의 경험치 획득 </S.Text>
        </S.Content>
        <S.StartBox to="/solve" onClick={handleQuizStart}>
          <S.Text type="small">퀘스트 수행하러</S.Text>
          <S.BoldText>Go!</S.BoldText>
        </S.StartBox>
      </S.ContentBox>
    </S.Container>
  );
}

export default RandomQuiz;
