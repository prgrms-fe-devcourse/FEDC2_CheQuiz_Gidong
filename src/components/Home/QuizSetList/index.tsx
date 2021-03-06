import { useEffect, useState } from 'react';
import * as S from './styles';
import Icon from '@/components/Icon';
import QuizSetCard from '../QuizSetCard';
import { ChannelAPI } from '@/interfaces/ChannelAPI';
import { useQuizContext } from '@/contexts/QuizContext';
import Select from '@/components/Form/Select';
import { getChannels } from '@/api/QuizServices';

function QuizSetList() {
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
          (quizset) => quizset._id !== process.env.DEFAULT_CHANNEL_ID,
        ),
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

    const parseValue = (value: string) => {
      return value.replace(/\s/g, '').toLowerCase();
    };

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
    sortValue: string,
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
          <Icon name="search" strokeWidth={4} />
          <S.SearchInput
            type="text"
            placeholder="??????"
            value={keyword}
            onChange={handleInputChange}
          />
        </S.SearchWrap>
        <Select
          defaultValue="??????"
          options={[
            { label: '?????????', value: 'new' },
            { label: '????????????', value: 'old' },
          ]}
          onChangeValue={(value: string) => setSortBy(value)}
          addStyle={{ width: '11rem', backgroundColor: '#DEE2E6' }}
        />
      </S.FilterContainer>
      <S.Title>?????? ????????? </S.Title>
      <S.QuizSetListContainer>
        {quizSetList
          .filter(isContainKeyword)
          .sort((a, b) => sortBySelect(a, b, sortBy))
          .map((quizSet: ChannelAPI, idx) => (
            <S.LinkToSolve
              to="/solve"
              key={quizSet._id}
              onClick={() => handleQuizClick(quizSet._id)}
            >
              <QuizSetCard quizSet={quizSet} cardIdx={idx} />
            </S.LinkToSolve>
          ))}
      </S.QuizSetListContainer>
    </section>
  );
}

export default QuizSetList;
