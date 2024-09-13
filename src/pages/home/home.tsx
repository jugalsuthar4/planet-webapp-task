import ReviewImage from '@/assets/reviews.jpg';
import Button from '@/components/button/button';
import StarIcon from '@/components/Icon/star-icon';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

const Home = () => {
  const router = useMemo(() => useRouter(), []);

  const navigateToSignIn = useCallback(() => {
    router.push('/signin');
  }, []);

  const navigateToSignup = useCallback(() => {
    router.push('/signup');
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center w-[95%] sm:w-[90%] p-6 sm:p-10">
      <div className="col-span-1 flex flex-col gap-6 sm:gap-8">
        <div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl my-2 sm:my-5">
            Enhance
          </h1>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Business, <span className="italic underline">Reviews</span>
          </h3>
        </div>
        <div className="text-sm sm:text-base">
          Manage and update your profile using secure authentication and a
          responsive interface.
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <Button
            className="text-white w-full sm:w-auto"
            id="button"
            onClick={() => {
              navigateToSignIn();
            }}
          >
            Login
          </Button>
          <Button
            className="text-white w-full sm:w-auto"
            id="button"
            variant="secondary"
            onClick={() => {
              navigateToSignup();
            }}
          >
            Signup
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="secondary" id="secondary_star" onClick={() => {}}>
            <StarIcon />{' '}
          </Button>
          <div className="text-xs">
            <p>Ratings</p>
            <p>Trust by 100+ of owners</p>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <img
          src={ReviewImage.src}
          alt="review_image"
          className="w-full h-auto max-w-md"
        />
      </div>
    </div>
  );
};

export default Home;
