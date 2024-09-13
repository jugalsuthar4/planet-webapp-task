import { useEffect, useState } from 'react';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import PasswordInput from '@/components/password-input/password-input';
import Image from 'next/image';
import ErrorText from '@/components/error-text/error-text';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '@/store/useUser';
import { toast } from 'react-toastify';
import { SOCIAL_MEDIA } from '@/constant/constant';

const LoginForm = () => {
  const router = useRouter();
  const [data, setData] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false,
  });

  const [login, loginError, loading] = useUser((state) => [
    state.loginUser,
    state.error,
    state.loading,
  ]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: !e.target.value,
    });
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      setError({
        username: !data.username,
        password: !data.password,
      });
      return;
    }
    await login({ username: data.username, password: data.password, router });
    setData({ password: '', username: '' });
  };

  useEffect(() => {
    if (loginError) {
      toast.error(loginError, { toastId: 'login_error' });
    }
  }, [loginError]);
  return (
    <div className="w-9/12">
      <div className="w-[100%]">
        <div className="my-8">
          <h2 className="text-2xl font-normal mb-4">Login</h2>
          <p>Login to access your vault account</p>
        </div>
        <form>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Input
                id="login__username"
                placeholder="Enter username"
                key="login_username"
                onChange={handleChange}
                type="text"
                value={data.username}
                name="username"
                className="w-[100%]"
                label="Username"
                isRequired={true}
              />
              {error.username && (
                <ErrorText error="please enter the username" />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <PasswordInput
                id="login__password"
                placeholder="Enter password"
                key="login_password"
                name="password"
                onChange={handleChange}
                value={data.password}
                label="Password"
              />
              {error.password && (
                <ErrorText error="please enter the password" />
              )}
            </div>
            <div>
              <p className="text-right text-sm text-gray-500 underline">
                Forgot Password ?
              </p>
            </div>
            <div>
              <Button
                onClick={handleLogin}
                id=""
                className="w-[100%]"
                size="medium"
                disabled={loading}
              >
                Login
              </Button>
            </div>
            <div className="flex gap-1 justify-center text-sm">
              <p>Don’t have an account?</p>
              <Link href="/signup" className="text-blue-800">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-gray-500">or login with</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {SOCIAL_MEDIA.map((e, idx) => {
            return (
              <div
                className="flex-1 flex items-center justify-center h-8 border-2 p-5 border-blue-400 rounded-md cursor-not-allowed"
                key={idx}
              >
                <Image src={e.logo} alt={e.name} width={24} height={24} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
