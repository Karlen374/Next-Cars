import Head from 'next/head';
import CarInfo from '../components/carInfo/carInfo';
import MainLayout from '../layouts/MainLayout';

const carId = () => {
  return (
    <>
      <Head>
        <title>Car Info Page</title>
        <meta key="store Cars" content="Car Info Page" />
      </Head>
      <MainLayout>
        <CarInfo />
      </MainLayout>
    </>

  );
};
export default carId;
