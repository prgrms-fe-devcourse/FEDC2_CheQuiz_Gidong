import React, { useRef, useState, useEffect } from 'react';
import Icon from '@components/Icon';
import QuizItem from './QuizItem';
import * as S from './styles';
import { createQuiz, createQuizSet } from '@/api/create';
import { QuizClientContent } from '@/interfaces/Quiz';
import { QUIZ_SET_TAG_LIST } from '@/constants';
import {
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_SET_DEFAULT_STATE,
} from '@/assets/QuizCreateMockData';

export interface QuizSetClientContent {
  name: string;
  tags: string[];
  des: string;
}

function QuizForm() {
  const [quizList, setQuizList] = useState<QuizClientContent[]>([
    QUIZ_ITEM_DEFAULT_STATE,
  ]);
  const [isSet, toggleSet] = useState<boolean>(false);
  const [quizSet, setQuizSet] = useState<QuizSetClientContent>(
    QUIZ_SET_DEFAULT_STATE,
  );
  const move = useRef(false);

  const handleSetTagChange = (tag: string) => {
    const index = quizSet.tags.indexOf(tag);
    if (index < 0) {
      setQuizSet({ ...quizSet, tags: [...quizSet.tags, tag] });
    } else {
      setQuizSet({ ...quizSet, tags: quizSet.tags.filter((t) => t !== tag) });
    }
  };
  const handleQuizChange = (id: number, key: string, value: string) => {
    setQuizList(
      quizList.map((quiz) =>
        quiz._id === id ? { ...quiz, [key]: value } : quiz,
      ),
    );
  };

  const handleQuizAdd = () => {
    setQuizList([
      ...quizList,
      {
        ...QUIZ_ITEM_DEFAULT_STATE,
        _id: Math.max(...quizList.map((quiz) => quiz._id), 0) + 1,
      },
    ]);
    move.current = !move.current;
  };
  const handleQuizDelete = (id: number) => () => {
    setQuizList(quizList.filter((quiz) => quiz._id !== id));
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('퀴즈제출');
    if (isSet) {
      const set = await createQuizSet(quizSet);
      if (!set) return;
      quizList.forEach((quiz) => {
        const { _id, ...quizData } = quiz;
        createQuiz(quizData, set._id);
      });
    } else {
      quizList.forEach((quiz) => {
        const { _id, ...quizData } = quiz;
        createQuiz(quizData);
      });
    }
  };

  const insertButtonRef = useRef<HTMLButtonElement>(null);
  const scrollToBottom = () => {
    insertButtonRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [move.current]);

  return (
    <S.FormContainer onSubmit={handleQuizSubmit}>
      <S.SetWrapper>
        <S.SetCheckBox
          type="checkbox"
          checked={isSet}
          onChange={() => toggleSet(!isSet)}
        />
        세트화 여부
        <S.SetNameInput
          disabled={!isSet}
          placeholder="퀴즈세트 이름을 적어주세요"
          onChange={({ target }) =>
            setQuizSet({ ...quizSet, name: target.value })
          }
        />
        {isSet && (
          <S.SetInfoWrpper>
            {QUIZ_SET_TAG_LIST.map((tag) => (
              <React.Fragment key={tag}>
                <S.SetTagInput
                  type="checkbox"
                  id={tag}
                  value={tag}
                  onChange={({ target }) => handleSetTagChange(target.value)}
                />
                <S.SetTag htmlFor={tag}>{tag}</S.SetTag>
              </React.Fragment>
            ))}
            <S.TextArea
              value={quizSet.des}
              placeholder="퀴즈세트에 대해서 설명해주세요"
              onChange={({ target }) =>
                setQuizSet({ ...quizSet, des: target.value })
              }
            />
          </S.SetInfoWrpper>
        )}
      </S.SetWrapper>
      <S.QuizListContainer>
        {quizList.map((quiz, idx) => (
          <QuizItem
            quizData={quiz}
            key={quiz._id}
            order={idx + 1}
            onChangeQuiz={handleQuizChange}
            handleQuizDelete={handleQuizDelete}
          />
        ))}
        <S.InsertQuizItem
          ref={insertButtonRef}
          type="button"
          onClick={handleQuizAdd}
        >
          <Icon name="plus-circle" size={24} />
          퀴즈 추가하기
        </S.InsertQuizItem>
      </S.QuizListContainer>
      <S.SubmitButton type="submit">퀴즈 제출</S.SubmitButton>
    </S.FormContainer>
  );
}

export default QuizForm;
