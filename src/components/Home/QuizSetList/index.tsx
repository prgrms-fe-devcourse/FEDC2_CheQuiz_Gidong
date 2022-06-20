import { useEffect, useState } from 'react';
import api from '@/api/axiosInstance';
import * as S from './styles';
import Icon from '@/components/Icon';
import QuizSetCard from '../QuizSetCard';
import { ChannelAPI } from '@/interfaces/ChannelAPI';

function QuizSetList() {
  const [quizSetList, setQuizSetList] = useState<ChannelAPI[]>([]);

  useEffect(() => {
    const getQuizSetList = async () => {
      const apiData = await api
        .get<ChannelAPI[]>('/channels')
        .then((response) => response.data);
      setQuizSetList(apiData);
    };
    getQuizSetList();
  }, []);

  return (
    <section>
      <S.FilterContainer>
        <S.SearchWrap>
          <Icon name="search" strokeWidth={4} />
          <S.SearchInput type="text" placeholder="검색" />
        </S.SearchWrap>
        <S.SortWrap>
          <S.SortSelect name="orders">
            <option value="" hidden>
              정렬
            </option>
            {['최신순', '좋아요순'].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </S.SortSelect>
        </S.SortWrap>
      </S.FilterContainer>
      <S.Title>지식 사냥터 </S.Title>
      <S.QuizSetListContainer>
        {quizSetList.map((quizSet: ChannelAPI) => (
          <QuizSetCard key={quizSet._id} quizSet={quizSet} />
        ))}
      </S.QuizSetListContainer>
    </section>
  );
}

export default QuizSetList;
