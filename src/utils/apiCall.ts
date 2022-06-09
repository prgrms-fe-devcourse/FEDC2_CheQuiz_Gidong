import { AxiosResponse } from 'axios';
import axiosInstance from '@/utils/apiInstance';

const ApiCall = async (
  method: string,
  url: string,
  params = '',
  data = {},
  headers = {},
): Promise<AxiosResponse> => {
  try {
    const res = await axiosInstance({
      method,
      url,
      params,
      data,
      headers,
    });

    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default ApiCall;
