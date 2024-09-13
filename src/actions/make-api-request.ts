/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS_TOKEN } from '@/constant/constant';
import Cookies from 'js-cookie';

const makeApiRequest = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const accessToken = Cookies.get(ACCESS_TOKEN);
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    const err = await response.json();
    throw new Error(err.message || 'something went wrong !');
  }
  return await response.json();
};
export default makeApiRequest;
