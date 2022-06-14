import api from '@/utils/apiInstance';

export function like(postId: string) {
  return api.post('/likes/create', { postId });
}

export function cancelLike(postId: string) {
  return api.post('/likes/delete', { postId });
}

export function createComment({
  comment,
  postId,
}: {
  comment: string;
  postId: string;
}) {
  return api.post('/comments/create', { comment, postId });
}

export function deleteComment(commentId: string) {
  return api.delete('/comments/delete', { data: { id: commentId } });
}
