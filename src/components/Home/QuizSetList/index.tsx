/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react';

import { getChannels } from '@/api/QuizServices';
import Select from '@/components/Form/Select';
import Icon from '@/components/Icon';
import { useQuizContext } from '@/contexts/QuizContext';

import QuizSetCard from '../QuizSetCard';

import * as S from './styles';

import type { ChannelAPI } from '@/interfaces/ChannelAPI';

const QuizSetList = () => {
  const [quizSetList, setQuizSetList] = useState<ChannelAPI[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('new');

  const { setRandomQuizCategory, setRandomQuizCount, setChannelId } =
    useQuizContext();

  useEffect(() => {
    const fetchQuizSets = async () => {
      const apiData = await getChannels();
      setQuizSetList(
        apiData.filter(
          (quizset) => quizset._id !== process.env.DEFAULT_CHANNEL_ID
        )
      );
    };

    fetchQuizSets();
  }, []);

  const handleInputChange = ({ target }: { target: HTMLInputElement }) => {
    setKeyword(target.value);
  };

  const isContainKeyword = (quizSet: ChannelAPI) => {
    const { name, description } = quizSet;
    const { tags, creator } = JSON.parse(description);

    const parseValue = (value: string) =>
      value.replace(/\s/g, '').toLowerCase();

    const lowerTitle = parseValue(name);
    const lowerTags = tags.map((tag: string) => parseValue(tag));
    const lowerUserName = parseValue(creator.fullName);
    const lowerKeyword = parseValue(keyword);

    const isFiltered =
      lowerTitle.indexOf(lowerKeyword) >= 0 ||
      lowerTags.includes(lowerKeyword) ||
      lowerUserName.indexOf(lowerKeyword) >= 0;
    return isFiltered;
  };

  const handleQuizClick = (id: string) => {
    setRandomQuizCategory(null);
    setRandomQuizCount(null);
    setChannelId(id);
  };

  const sortBySelect = (
    prev: ChannelAPI,
    next: ChannelAPI,
    sortValue: string
  ) => {
    const byNewer = +new Date(next.createdAt) - +new Date(prev?.createdAt);
    const byOlder = +new Date(prev.createdAt) - +new Date(next?.createdAt);

    switch (sortValue) {
      case 'new':
        return byNewer;
      case 'old':
        return byOlder;
      default:
        return byNewer;
    }
  };
  return (
    <section>
      <S.FilterContainer>
        <S.SearchWrap>
          <Icon
            name='search'
            strokeWidth={4}
          />
          <S.SearchInput
            placeholder='검색'
            type='text'
            value={keyword}
            onChange={handleInputChange}
          />
        </S.SearchWrap>
        <Select
          addStyle={{ width: '11rem', backgroundColor: '#DEE2E6' }}
          defaultValue='정렬'
          options={[
            { label: '최신순', value: 'new' },
            { label: '오래된순', value: 'old' },
          ]}
          onChangeValue={(value: string) => setSortBy(value)}
        />
      </S.FilterContainer>
      <S.Title>지식 사냥터 </S.Title>
      <S.QuizSetListContainer>
        {quizSetList
          .filter(isContainKeyword)
          .sort((a, b) => sortBySelect(a, b, sortBy))
          .map((quizSet: ChannelAPI, idx) => (
            <S.LinkToSolve
              key={quizSet._id}
              to='/solve'
              onClick={() => handleQuizClick(quizSet._id)}
            >
              <QuizSetCard
                cardIdx={idx}
                quizSet={quizSet}
              />
            </S.LinkToSolve>
          ))}
      </S.QuizSetListContainer>
    </section>
  );
};

export default QuizSetList;
