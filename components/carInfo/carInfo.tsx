import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { useStore } from 'effector-react';
import styles from './carInfo.module.scss';
import { ICar } from '../../types/ICar';
import CarGraph from '../carGraph/carGraph';
import { $cars, changeLiked } from '../../models/cars/cars';

const CarInfo = ({ id }: any) => {
  const cars = useStore($cars);
  const [carInfo, setCarInfo] = useState<ICar | null>(null);

  const getCarInfoById = () => {
    setCarInfo(cars.filter((item) => item.id === id)[0]);
  };

  useEffect(() => {
    getCarInfoById();
  }, [id]);

  const LikeButton = !carInfo?.liked
    ? <FavoriteBorderIcon /> : <FavoriteIcon sx={{ color: red[900] }} />;

  return (
    <>
      <div className={styles.Car_Info}>

        <div className={styles.Car_Info__Img}>Картинка</div>

        <div>
          <IconButton
            onClick={() => (changeLiked(carInfo?.id))}
            aria-label="add to favorites"
          >
            {LikeButton}
          </IconButton>
          <div>
            Марка-
            {carInfo?.brand}
          </div>
          <div>
            Название-
            {carInfo?.model}
          </div>
          <div>
            Год Выпуска-
            {carInfo?.releaseYear}
          </div>
          <div>
            Цена-
            {carInfo?.price}
          </div>
          <div>
            Описание-
            {carInfo?.description}
          </div>
        </div>

      </div>
      <CarGraph data={cars} />
    </>
  );
};

export default CarInfo;
