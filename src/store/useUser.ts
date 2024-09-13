import { ICreateUser, IUserResponse } from '@/interface/IUser';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NextRouter } from 'next/router';
import createUser from '@/actions/create-user';
import updateUser from '@/actions/update-user';
import loginUser from '@/actions/login-user';
import fetchUser from '@/actions/fetch-user';
import logout from '@/actions/logout';

export type IUserStore = {
  user: IUserResponse | null;
  error: string;
  loading: boolean;
  success: string;
  createUser: (user: ICreateUser, router: NextRouter) => Promise<void>;
  updateUser: (
    user: Omit<ICreateUser, 'password'>,
    router: NextRouter
  ) => Promise<void>;
  fetchUser: (router: NextRouter) => Promise<void>;
  logout: (router: NextRouter) => void;
  loginUser: ({
    username,
    password,
    router,
  }: {
    username: string;
    password: string;
    router: NextRouter;
  }) => Promise<void>;
};

const useUser = create(
  persist<IUserStore>(
    (__, _) => ({
      user: null,
      error: '',
      success: '',
      loading: false,
      createUser: (user: ICreateUser, router: NextRouter) =>
        createUser(user, router),
      updateUser: (user: Omit<ICreateUser, 'password'>, router: NextRouter) =>
        updateUser(user, router),
      loginUser: async ({
        username,
        password,
        router,
      }: {
        username: string;
        password: string;
        router: NextRouter;
      }) => loginUser({ username, password, router }),
      fetchUser: (router) => fetchUser(router),
      logout: (router) => logout(router),
    }),

    {
      name: 'user-storage',
    }
  )
);

export default useUser;

export type SetState<T> = (
  partial: Partial<T> | ((state: T) => Partial<T>),
  replace?: boolean
) => void;

export const { getState, setState } = useUser;
