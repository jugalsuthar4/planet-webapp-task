import React, { useEffect } from 'react';
import EditProfileImage from '@/assets/edit-profile.jpg';
import EditProfile from './edit-profile';
import Header from '@/components/header/header';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constant/constant';
import { useRouter } from 'next/router';
import useUser from '@/store/useUser';

const Index = () => {
  const router = useRouter();
  const fetchUser = useUser((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(router);
  });
  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[80vh] md:justify-items-center">
        <div className="w-full md:col-span-1 flex justify-center items-start">
          <EditProfile />
        </div>
        <div
          className="hidden md:block w-[75%] bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${EditProfileImage.src})` }}
        ></div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const accessToken = req.cookies[ACCESS_TOKEN];
  const refreshToken = req.cookies[REFRESH_TOKEN];
  if (!accessToken || !refreshToken) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Index;
