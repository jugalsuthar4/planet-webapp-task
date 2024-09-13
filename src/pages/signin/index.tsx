import React from 'react';
import LoginImage from '@/assets/login.png';
import LoginForm from './signin-form';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { APP_NAME } from '@/constant/constant';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const Login = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex px-8 py-4 items-center gap-2  justify-center md:justify-start ">
        <Image src={logo.src} alt="logo" width={33} height={42} />
        <h3 className="font-bold">{APP_NAME}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full  md:justify-items-center h-[80vh]">
        <div className="w-full  md:col-span-1 flex  justify-center">
          <LoginForm />
        </div>
        <div
          className="hidden md:block h-full w-[75%] bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${LoginImage.src})` }}
        ></div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const accessToken = req.cookies['accessToken'];
  if (accessToken) {
    return {
      redirect: {
        destination: '/edit-profile',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
