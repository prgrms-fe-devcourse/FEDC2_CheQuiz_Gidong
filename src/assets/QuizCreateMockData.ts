import { QuizClientContent } from '@/interfaces/Quiz';

const QUIZ_CATEGORY_LIST = [
  { label: '자바스크립트', value: 'javascript' },
  'html',
  'css',
  'react',
];

const QUIZ_ANSWER_TYPE_LIST = [
  { label: 'O/X 문제', value: 'trueOrFalse', canUse: true },
  { label: '객관식 문제', value: 'multipleChoice', canUse: true },
  { label: '단답식 문제', value: 'shortAnswer', canUse: false },
];

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
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_CATEGORY_LIST,
  QUIZ_ANSWER_TYPE_LIST,
  SAMPLE_QUIZ_LIST_STATE,
};
