/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fetchUserData } from '@/api/user';
import { MAXEXP } from '@/common/number';
import { imageBreakpoints } from '@/components/UserInfo/breakpoints';

export const getUserImageByPoints = (points: number) => {
  const level = points ? Math.floor(points / MAXEXP) + 1 : 1;
  let selectedId = imageBreakpoints[0].imageId;
  imageBreakpoints.forEach((breakpoint) => {
    if (level >= breakpoint.level) {
      selectedId = breakpoint.imageId;
    }
  });
  return `https://maplestory.io/api/GMS/210.1.1/mob/${selectedId}/render/stand`;
};

export const getUserImageById = async (id: string) => {
  const apiData = await fetchUserData(id);
  const points = apiData.username ? JSON.parse(apiData.username).points : 0;
  return getUserImageByPoints(points);
};
