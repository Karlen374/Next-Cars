import { useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import CarList from '../components/carList/carList';
import CarListHeader from '../components/carListHeader/carListHeader';
import { useAppDispatch } from '../hooks/hooks';
import { getData } from '../store/slices/carSlice';

const Index = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

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
