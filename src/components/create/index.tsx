import React, { useState } from 'react';
import styled from '@emotion/styled';
import QuizItem from './QuizItem';
import { createQuiz, createQuizSet } from '@/api/create';
import { QuizClientContent } from '@/interfaces/Quiz';
import { QUIZ_SET_TAG_LIST } from '@/constants';
import {
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_SET_DEFAULT_STATE,
} from '@/assets/QuizCreateMockData';

const QuizFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 150px;
`;
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
  return (
    <QuizFormWrapper onSubmit={handleQuizSubmit}>
      <section>
        <input
          type="checkbox"
          checked={isSet}
          onChange={() => toggleSet(!isSet)}
        />
        세트화 여부
        <input
          disabled={!isSet}
          placeholder="세트이름"
          onChange={({ target }) =>
            setQuizSet({ ...quizSet, name: target.value })
          }
        />
        {isSet && (
          <div>
            {QUIZ_SET_TAG_LIST.map((tag) => (
              <span key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  onChange={({ target }) => handleSetTagChange(target.value)}
                />
                {tag}
              </span>
            ))}
            <textarea
              value={quizSet.des}
              onChange={({ target }) =>
                setQuizSet({ ...quizSet, des: target.value })
              }
              style={{ display: 'block', width: '100%' }}
            />
          </div>
        )}
      </section>
      <section>
        {quizList.map((quiz) => (
          <QuizItem
            quizData={quiz}
            key={quiz._id}
            onChangeQuiz={handleQuizChange}
            handleQuizDelete={handleQuizDelete}
          />
        ))}
      </section>
      <section style={{ marginTop: '50px' }}>
        <button type="button" onClick={handleQuizAdd}>
          퀴즈 추가하기
        </button>
        <button type="submit">퀴즈 제출</button>
      </section>
    </QuizFormWrapper>
  );
}

export default QuizForm;
