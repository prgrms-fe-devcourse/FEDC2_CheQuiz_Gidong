class QuizServices {
  // 퀴즈 불러오기
  // 퀴즈 랜덤 로직
  /**
   * getChannels().then(data => data.map(channel => channel.post.postId))
   */
  static getShuffledPostIds(postIdArray: string[], count: number): string[] {
    const ret = [...postIdArray];
    for (let i = 0; i < postIdArray.length - 1; i += 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [ret[i], ret[j]] = [ret[j], ret[i]];
    }
    return ret.slice(0, count < ret.length ? count : ret.length);
  }
  // 퀴즈 타입에 따른 보기 생성하기
  // 유저가 쓴 답과 정답 비교하기
  // 유저가 얻을 점수 계산하기 -> difficulty, importance
}

export default new QuizServices();
