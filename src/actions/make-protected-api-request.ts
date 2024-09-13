import makeApiRequest from './make-api-request';
import refreshAccessToken from './refresh-access-token';
import { NextRouter } from 'next/router';

const makeProtectedApiRequest = async <T>(
  url: string,
  options: RequestInit,
  router: NextRouter
): Promise<T> => {
  try {
    return await makeApiRequest<T>(url, options);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      try {
        await refreshAccessToken(router);
        return await makeApiRequest<T>(url, options);
      } catch (refreshError) {
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};
export default makeProtectedApiRequest;
