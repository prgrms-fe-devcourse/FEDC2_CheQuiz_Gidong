import * as S from './styles';

import type { CommentAPI } from '@/interfaces/CommentAPI';
import type { LikeAPI } from '@/interfaces/LikeAPI';
import type { UserAPI } from '@/interfaces/UserAPI';

interface Props {
  author?: UserAPI;
  comment?: CommentAPI;
  like?: LikeAPI;
}

const Item = ({ author, comment, like }: Props) =>
  author ? (
    <S.Item>
      {author.fullName}님이
      {(comment && ' 댓글을 달았습니다') || (like && ' 좋아요를 눌렀습니다')}
    </S.Item>
  ) : (
    <S.Item>알림이 없습니다</S.Item>
  );

export default Item;
