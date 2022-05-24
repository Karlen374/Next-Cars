import { useEffect } from 'react';
import Head from 'next/head';
import { useStore } from 'effector-react';
import MainLayout from '../layouts/MainLayout';
import CarList from '../components/carList/carList';
import CarListHeader from '../components/carListHeader/carListHeader';
import { loadCars } from '../models/cars/cars';
import { $searchParams } from '../models/searchParams/searchParams';

const Index = () => {
  const searchParams = useStore($searchParams);
  useEffect(() => {
    loadCars();
  }, [searchParams.changeFilter]);

  return (
    <>
      <Head>
        <title>Cars Page</title>
        <meta key="store Cars" content="Cars Page" />
      </Head>
      <MainLayout>
        <CarListHeader />
        <CarList />
      </MainLayout>
    </>

  );
};
export default Index;
