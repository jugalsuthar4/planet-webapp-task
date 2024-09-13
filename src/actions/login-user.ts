import { setState as set } from '@/store/useUser';
import { NextRouter } from 'next/router';
import Cookies from 'js-cookie';
import { IUserResponse } from '@/interface/IUser';
import { SERVER } from '@/constant/constant';
import makeProtectedApiRequest from './make-protected-api-request';
const loginUser = async ({
  username,
  password,
  router,
}: {
  username: string;
  password: string;
  router: NextRouter;
}) => {
  try {
    set((state) => ({ ...state, loading: true, error: '', success: '' }));
    const result = await makeProtectedApiRequest<IUserResponse>(
      `${SERVER}/auth/login`,
      {
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
        method: 'POST',
      },
      router
    );
    Cookies.set('accessToken', result.token, { secure: true });
    Cookies.set('refreshToken', result.refreshToken, { secure: true });
    set((state) => ({
      ...state,
      user: result,
      loading: false,
      success: 'user logged in successfully !',
    }));
    router.replace('/edit-profile');
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

export default loginUser;
