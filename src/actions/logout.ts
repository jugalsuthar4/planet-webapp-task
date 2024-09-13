import { setState as set } from '@/store/useUser';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';

const logout = async (router: NextRouter) => {
  try {
    set((state) => ({
      ...state,
      user: null,
      error: '',
      loading: false,
      success: '',
    }));
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.replace('/signin');
  } catch (error) {
    console.error('unable to logout ', error);
  }
};

export default logout;
