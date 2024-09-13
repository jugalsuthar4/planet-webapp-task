import React, { useEffect } from 'react';
import SignupImage from '@/assets/signup.jpg';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { APP_NAME } from '@/constant/constant';
import SignupForm from './signup-form';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { toast } from 'react-toastify';
import useUser from '@/store/useUser';

const Index = () => { 

  const success=useUser(state=>state.success)

  useEffect(() => {
    if (success) toast.success(success, { toastId: 'login_success' });
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="flex px-8 py-4 items-center gap-2 justify-center md:justify-start ">
        <Image src={logo.src} alt="logo" width={33} height={42} />
        <h3 className="font-bold">{APP_NAME}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[80vh] md:justify-items-center">
        <div className="w-full md:col-span-1 flex justify-center items-start">
          <SignupForm />
        </div>
        <div
          className="hidden md:block w-[75%] bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${SignupImage.src})` }}
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

export default Index;
