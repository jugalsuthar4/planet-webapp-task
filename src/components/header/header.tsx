import Image from 'next/image';
import React from 'react';
import { APP_NAME } from '@/constant/constant';
import logo from '@/assets/logo.png';
import Button from '@/components/button/button';
import useUser from '@/store/useUser';
import { useRouter } from 'next/router';

const Header = () => {
  const [user, logout] = useUser((state) => [state.user, state.logout]);
  const router=useRouter()
  return (
    <div className="w-full flex px-8 py-4 items-center gap-4 md:gap-8 justify-center md:justify-between bg-gray-100 ">
      <div className="flex items-center gap-3">
        <Image
          src={logo.src}
          alt="logo"
          width={33}
          height={42}
          className="object-contain"
        />
        <h3 className="font-bold text-lg text-gray-800">{APP_NAME}</h3>
      </div>
      {user != null && (
        <div className="flex items-center gap-4">
          <Image
            src={user?.image ?? ''}
            alt="user_profile"
            width={36}
            height={36}
            className="rounded-full border border-gray-300 "
          />
          <p className="text-sm font-medium text-gray-700">{user?.username}</p>
          <Button
            id="logout_button"
            onClick={()=>logout(router)}
            size="small"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
