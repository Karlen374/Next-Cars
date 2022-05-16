import Grid from '@mui/material/Grid';
import Modal from '../shared/modal/modal';
import { useAppSelector } from '../../hooks/hooks';
import CreateAdvertisement from '../shared/createAdvertisement/createAdvertisement';
import CarItems from './carItems/carItems';
import styles from './carList.module.scss';

const CarList = () => {
  const { visibleData, modal } = useAppSelector((store) => store.car);

  return (
    <div>

      <Modal active={modal}>
        <CreateAdvertisement />
      </Modal>

      <div className={styles.Car_List}>
        <Grid container spacing={3}>
          <CarItems data={visibleData} />
        </Grid>
      </div>

    </div>
  );
};

export default CarList;
