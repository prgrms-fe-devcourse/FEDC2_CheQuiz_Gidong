//* 제어 컴포넌트 방식으로 구성 해보기
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { QUIZ_ITEM_DEFAULT_STATE } from '@/assets/QuizCreateMockData';
import QuizItem from '@/containers/QuizCreate/QuizItem';
import { QuizClientContent } from '@/interfaces/Quiz';

const QuizForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;
// Todo. 추가된 QuizItem 지우기
// Todo_Next1. 작성한 폼으로 한 번에 여러개 질문 생성 요청하기
// Todo_Next2. 작성한 폼으로 세트 생성 요청하기

// Todo. 기능 점검 PR
// Todo. useInput, Hooks 만들기

// Todo_Next3.디자인 및 컴포넌트 화

function QuizCreate() {
  const [quizList, setQuizList] = useState<QuizClientContent[]>([
    QUIZ_ITEM_DEFAULT_STATE,
  ]);

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(quizList);
    // console.log('퀴즈 제출');
  };

  const handleQuizAdd = (e: React.MouseEvent) => {
    setQuizList([
      ...quizList,
      {
        ...QUIZ_ITEM_DEFAULT_STATE,
        _id: Math.max(...quizList.map((quiz) => quiz._id), 0) + 1,
      },
    ]);
    e.preventDefault();
  };

  const handleQuizDelete = (id: number) => (e: React.MouseEvent) => {
    setQuizList(quizList.filter((quiz) => quiz._id !== id));
    e.preventDefault();
  };
  const handleQuizChange = (id: number, key: string, value: string) => {
    setQuizList(
      quizList.map((quiz) =>
        quiz._id === id ? { ...quiz, [key]: value } : quiz,
      ),
    );
  };

  useEffect(() => {
    // console.log(quizList);
  }, [quizList]);
  return (
    <QuizForm onSubmit={handleQuizSubmit}>
      <div className="set" style={{ display: 'flex' }}>
        <div className="checkbox">
          <input type="checkbox" name="set" id="set" />
          세트화 여부
        </div>
        <input className="set-title" disabled placeholder="세트이름" />
      </div>
      <br />
      {quizList.map((quiz) => (
        <QuizItem
          quizData={quiz}
          key={quiz._id}
          onChangeQuiz={handleQuizChange}
          handleQuizDelete={handleQuizDelete}
        />
      ))}

      <div className="add" style={{ marginTop: '100px' }}>
        <button type="button" onClick={handleQuizAdd}>
          퀴즈 추가하기
        </button>
      </div>

      <div style={{ marginTop: '100px' }}>
        <button type="submit">퀴즈 제출</button>
      </div>
    </QuizForm>
  );
}

export default QuizCreate;
