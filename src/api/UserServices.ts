/* eslint-disable @typescript-eslint/restrict-template-expressions */
import api from '@/api/axiosInstance';

import type {
  UpdateNameFormData,
  UpdatePasswordFormData,
} from '@/interfaces/ChangeFormData';
import type { CommentAPI } from '@/interfaces/CommentAPI';
import type { LikeAPI } from '@/interfaces/LikeAPI';
import type { UserAPI, UserQuizPostAPI } from '@/interfaces/UserAPI';
import type { AxiosRequestHeaders } from 'axios';

const isNotNull = (item: string | null): item is string => !!item;

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
      }
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
      }
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

export function updateTotalPoint(info: UserQuizPostAPI) {
  return api
    .put<UserAPI>(
      '/settings/update-user',
      { ...info, username: JSON.stringify(info.username) },
      { headers: { ...getHeaders() } }
    )
    .then((response) => response.data)
    .catch(() => {
      throw new Error('error occured at updateTotalPoint.');
    });
}

export function updateFullName(userUpdateData: UpdateNameFormData) {
  return api
    .put<UserAPI>(
      '/settings/update-user',
      { ...userUpdateData },
      { headers: { ...getHeaders() } }
    )
    .then((response) => response.data)
    .catch(() => {
      throw new Error('error occured at updateFullName.');
    });
}
export function updatePassword(passwordData: UpdatePasswordFormData) {
  return api
    .put<UserAPI>(
      '/settings/update-password',
      { ...passwordData },
      { headers: { ...getHeaders() } }
    )
    .then((response) => response.data)
    .catch(() => {
      throw new Error('error occured at updatePassword.');
    });
}
