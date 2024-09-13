import { SERVER } from '@/constant/constant';
import { ICreateUser, IUserResponse } from '@/interface/IUser';
import { setState as set } from '@/store/useUser';
import makeProtectedApiRequest from './make-protected-api-request';
import { NextRouter } from 'next/router';

const createUser = async (user: ICreateUser, router: NextRouter) => {
  try {
    set((state) => ({ ...state, loading: true, error: '', success: '' }));
    const result = await makeProtectedApiRequest<IUserResponse>(
      `${SERVER}/users/add`,
      {
        body: JSON.stringify(user),
        method: 'POST',
      },
      router
    );
    set((state) => ({
      ...state,
      user: result,
      loading: false,
      success: 'user created !',
    }));
    router.replace('/signin');
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

export default createUser;
