import type { QuizClientContent } from '@/interfaces/Quiz';

const QUIZ_ITEM_DEFAULT_STATE: QuizClientContent = {
  _id: 0,
  category: '',
  question: '',
  difficulty: 0,
  importance: 0,
  answerType: 'trueOrFalse',
  answer: '',
  answerDescription: '',
};

const QUIZ_SET_DEFAULT_STATE = {
  name: '',
  tags: [],
  des: '',
};
const SAMPLE_QUIZ_LIST_STATE: QuizClientContent[] = [
  {
    _id: 0,
    category: '',
    question: '',
    difficulty: 0,
    importance: 0,
    answerType: 'trueOrFalse',
    answer: '',
    answerDescription: '',
  },
  {
    _id: 1,
    category: 'javascript',
    question: '질문타이틀_자바스크립트는 인터프리터언어?',
    difficulty: 5,
    importance: 5,
    answerType: 'trueOrFalse',
    answer: 'true',
    answerDescription:
      '정답해설_자바스크립트는 인터프리터언어이다. 왜냐하면 인터프리터이기 때문이다.',
  },
  {
    _id: 2,
    category: 'react',
    question: '질문타이틀_리액트는 프레임워크입니까?',
    difficulty: 3,
    importance: 2,
    answerType: 'trueOrFalse',
    answer: 'false',
    answerDescription:
      '정답해설_리액트는 프레임워크가 아니라 라이브러리입니다. 왜냐하면 js를 자유롭게 사용가능하기 때문입니다.',
  },
];
export {
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_SET_DEFAULT_STATE,
  SAMPLE_QUIZ_LIST_STATE,
};
