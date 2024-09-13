import FacebookLogo from '@/assets/facebook.png';
import GoogleLogo from '@/assets/google.png';
import AppleLogo from '@/assets/apple.png';
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'UserVault';
export const SERVER =
  process.env.NEXT_PUBLIC_APP_SERVER || 'https://dummyjson.com';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const GENDER = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Others',
    value: 'others',
  },
];

export const SOCIAL_MEDIA = [
  {
    logo: FacebookLogo,
    name: 'facebook',
  },
  {
    logo: GoogleLogo,
    name: 'google',
  },
  {
    logo: AppleLogo,
    name: 'apple',
  },
];
