/**
 * ANCHOR: 10보다 작으면 앞에 0을 붙여주는 함수
 */
export function format(number: number) {
  return number < 10 ? `0${number}` : `${number}`;
}

export default function dateFormat(dateString: string) {
  const specificDate = new Date(dateString);
  const now = new Date();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _ = format;

  /**
   * 작성 시간이 오늘을 넘기지 않았다면, 시간, 분을 표시한다.
   * 작성 시간이 오늘 날짜가 아니라면, 월, 일을 표시한다.
   * 작성 시간이 올해가 아니라면, 년, 월을 표시한다.
   */
  const year = specificDate.getFullYear();
  const month = specificDate.getMonth();
  const date = specificDate.getDate();
  const hours = specificDate.getHours();
  const minutes = specificDate.getMinutes();

  if (year === now.getFullYear() && date === now.getDate())
    return `${_(hours)}:${_(minutes)}`;
  if (year === now.getFullYear()) return `${_(month + 1)}.${_(date)}`;
  return `${_(year).slice(-2, _(year).length)}.${_(month + 1)}`;
}
