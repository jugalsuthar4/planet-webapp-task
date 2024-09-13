import { setState as set, getState as get } from '@/store/useUser';
import Cookies from 'js-cookie';
import { SERVER } from '@/constant/constant';
import { NextRouter } from 'next/router';
import makeProtectedApiRequest from './make-protected-api-request';

const refreshAccessToken = async (router: NextRouter) => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      get().logout(router);
      throw new Error('unauthorized access !');
    }
    const result = await makeProtectedApiRequest<{
      token: string;
      refreshToken: string;
    }>(
      `${SERVER}/auth/refresh`,
      {
        method: 'POST',
        body: JSON.stringify({
          refreshToken,
          expiresInMins: 30,
        }),
      },
      router
    );
    Cookies.set('accessToken', result.token, { secure: true });
    Cookies.set('refreshToken', result.refreshToken, { secure: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      set((state) => ({ ...state, loading: false, error: error.message }));
    } else {
      set((state) => ({
        ...state,
        loading: false,
        error: 'An unknown error occurred',
      }));
    }
  }
};

export default refreshAccessToken;
