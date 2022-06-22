export const levelBreakpoints = [
  { level: 0, color: '#977C37' },
  { level: 10, color: '#5f7161' },
  { level: 50, color: '#6D8B74' },
  { level: 100, color: '#00FFAB' },
  { level: 500, color: '#0D99FF' },
  { level: 1000, color: '#FFBEB8' },
  { level: 5000, color: '#FAFF00' },
  { level: 10000, color: '#F30E5C' },
  { level: 50000, color: '#FF1809' },
];

export const imageBreakpoints = [
  { level: 0, imageId: '100200' },
  { level: 10, imageId: '100120' },
  { level: 50, imageId: '100121' },
  { level: 100, imageId: '100122' },
  { level: 500, imageId: '100123' },
  { level: 1000, imageId: '100124' },
  { level: 5000, imageId: '2510000' },
  { level: 10000, imageId: '8600006' },
  { level: 50000, imageId: '6400007' },
];

export const commentBreakpoints = [
  {
    count: 0,
    color: 'mediumpurple',
    text: '묵언수행중',
    exact: true,
  },
  {
    count: 10,
    color: '#ADE85A',
    text: '투머치토커',
    exact: false,
  },
];

export const likeBreakpoints = [
  {
    count: 0,
    color: '#7E7474',
    text: '무뚝뚝그자체',
    exact: true,
  },
  {
    count: 10,
    color: '#FF937E ',
    text: '사랑꾼',
    exact: false,
  },
];

export const likeAndCommentBreakpoints = [
  {
    count: 0,
    color: '#999',
    text: '혼자가좋아',
    exact: true,
  },
  {
    count: 10,
    color: '#FF6254',
    text: '소통왕',
    exact: false,
  },
];
