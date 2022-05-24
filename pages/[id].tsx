import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CarInfo from '../components/carInfo/carInfo';
import MainLayout from '../layouts/MainLayout';
import { loadCars } from '../models/cars/cars';

const carId = () => {
  const { query } = useRouter();

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <>
      <Head>
        <title>Car Info Page</title>
        <meta key="store Cars" content="Car Info Page" />
      </Head>
      <MainLayout>
        <CarInfo id={query.id} key={query.id} />
      </MainLayout>
    </>

  );
};
export default carId;
