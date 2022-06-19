import { AxiosRequestHeaders } from 'axios';
import api from '@/api/axiosInstance';
import { CommentAPI } from '@/interfaces/CommentAPI';
import { LikeAPI } from '@/interfaces/LikeAPI';

const isNotNull = (item: string | null): item is string => {
  return !!item;
};

function getHeaders(): AxiosRequestHeaders {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${isNotNull(token) ? JSON.parse(token) : ''}`,
  };
}

export function like(postId: string) {
  return api
    .post<LikeAPI>(
      '/likes/create',
      { postId },
      {
        headers: { ...getHeaders() },
      },
    )
    .then((response) => response.data)
    .catch(() => {
      throw new Error('error occuread at like.');
    });
}

export function cancelLike(likeId: string) {
  return api.delete('/likes/delete', {
    data: { id: likeId },
    headers: { ...getHeaders() },
  });
}

export function createComment({
  comment,
  postId,
}: {
  comment: string;
  postId: string;
}) {
  return api
    .post<CommentAPI>(
      '/comments/create',
      { comment, postId },
      {
        headers: { ...getHeaders() },
      },
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error('error occured at createComment.');
    });
}

export function deleteComment(commentId: string) {
  return api.delete('/comments/delete', {
    data: { id: commentId },
    headers: { ...getHeaders() },
  });
}
