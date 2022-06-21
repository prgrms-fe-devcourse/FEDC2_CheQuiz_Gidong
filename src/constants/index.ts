export const DIFFICULTY_COUNT = 5;
export const IMPORTANCE_COUNT = 5;

export const QUIZ_CATEGORY_LIST = [
  { label: 'Html', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: '자바스크립트', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'SCSS', value: 'scss' },
  { label: 'Web', value: 'web' },
  { label: 'CS지식', value: 'cs' },
];

export const QUIZ_ANSWER_TYPE_LIST = [
  { label: 'O/X 문제', value: 'trueOrFalse', disabled: false },
  { label: '객관식 문제', value: 'multipleChoice', disabled: true },
  { label: '단답식 문제', value: 'shortAnswer', disabled: true },
];

export const QUIZ_SET_TAG_LIST = [
  'React',
  'Vue',
  'HTML',
  'CSS',
  'SCSS',
  'Javascript',
  'Web',
  'CS지식',
];

// used in QuizSolve and QuizResults pages.
export const POST_IDS = 'post-ids';
export const USER_ANSWERS = 'user-answers';
export const POINTS = 'points';
