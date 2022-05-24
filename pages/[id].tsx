import Head from 'next/head';
import { useRouter } from 'next/router';
import CarInfo from '../components/carInfo/carInfo';
import MainLayout from '../layouts/MainLayout';

const carId = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Car Info Page</title>
        <meta key="store Cars" content="Car Info Page" />
      </Head>
      <MainLayout>
        {!!query.id && <CarInfo id={query.id} key={query.id} />}
      </MainLayout>
    </>

  );
};
export default carId;
