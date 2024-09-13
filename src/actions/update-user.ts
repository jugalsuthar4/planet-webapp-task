import { ICreateUser, IUserResponse } from '@/interface/IUser';
import useUser, { setState as set } from '@/store/useUser';
import { SERVER } from '@/constant/constant';
import makeProtectedApiRequest from './make-protected-api-request';
import { NextRouter } from 'next/router';

const updateUser = async (
  user: Omit<ICreateUser, 'password'>,
  router: NextRouter
) => {
  try {
    set((state) => ({ ...state, loading: true, error: '', success: '' }));
    const id = useUser.getState().user?.id;
    const result = await makeProtectedApiRequest<IUserResponse>(
      `${SERVER}/users/${id}`,
      { method: 'PUT', body: JSON.stringify(user) },
      router
    );
    set((state) => ({
      ...state,
      user: result,
      loading: false,
      error: '',
      success: 'user updated !',
    }));
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

export default updateUser;
