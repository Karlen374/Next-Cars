import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import styles from './appHeader.module.scss';
import { openModal, setSelectedCar } from '../../store/slices/carSlice';

const AppHeader = () => {
  const dispatch = useDispatch();

  const openModalAddForm = () => {
    dispatch(setSelectedCar());
    dispatch(openModal());
  };

  return (
    <div className={styles.Home_Page}>
      <Grid container columnSpacing={{ lg: 90, md: 50 }} rowSpacing={3}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Link href="/">
            <Button variant="contained" color="success">Home Page</Button>
          </Link>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button variant="contained" color="success" onClick={() => openModalAddForm()}>разместить объявление</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppHeader;
