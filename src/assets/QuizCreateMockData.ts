import { QuizClientContent } from '@/interfaces/Quiz';

const TEST_ADMIN_TOKEN = '';

const TEST_USER_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyYTE5YzkxZDI5OGQwMzk2ZDdlNmQzNiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9LCJpYXQiOjE2NTUxMTI2MDN9.4h_h2mQIAkCjIcAIneiasVnGz4m-yF17SL1Wcn4PZ5Y';
const TEST_CHANNEL_ID = '62a1bef4d298d0396d7e6e44';

const QUIZ_ITEM_DEFAULT_STATE: QuizClientContent = {
  _id: 0,
  tag: '',
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
    tag: '',
    question: '',
    difficulty: 0,
    importance: 0,
    answerType: 'trueOrFalse',
    answer: '',
    answerDescription: '',
  },
  {
    _id: 1,
    tag: 'javascript',
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
    tag: 'react',
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
  TEST_CHANNEL_ID,
  TEST_ADMIN_TOKEN,
  TEST_USER_TOKEN,
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_SET_DEFAULT_STATE,
  SAMPLE_QUIZ_LIST_STATE,
};
