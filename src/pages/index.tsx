 import Header from '@/components/header/header';
import Home from './home/home';
import Footer from '@/components/footer/footer';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

function index() {
  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

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

export default index;
