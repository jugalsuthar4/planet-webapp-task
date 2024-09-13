import { setState as set } from '@/store/useUser';
import makeProtectedApiRequest from './make-protected-api-request';
import { IUserResponse } from '@/interface/IUser';
import { SERVER } from '@/constant/constant';
import { NextRouter } from 'next/router';

const fetchUser = async (router: NextRouter) => {
  try {
    set((state) => ({
      ...state,
      user: null,
      loading: false,
      error: '',
      success: '',
    }));
    const result = await makeProtectedApiRequest<IUserResponse>(
      `${SERVER}/user/me`,
      {
        method: 'GET',
      },
      router
    );
    const {
      birthDate,
      description,
      email,
      firstName,
      gender,
      id,
      image,
      lastName,
      refreshToken,
      token,
      username,
    } = result;
    set((state) => ({
      ...state,
      user: {
        birthDate,
        description,
        email,
        firstName,
        gender,
        id,
        image,
        lastName,
        refreshToken,
        token,
        username,
      },
      loading: false,
      error: '',
      success: '',
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

export default fetchUser;
