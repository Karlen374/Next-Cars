import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import styles from './carInfo.module.scss';
import { changeLiked } from '../../store/slices/carSlice';
import { ICar } from '../../models/ICar';
import CarGraph from '../carGraph/carGraph';

const CarInfo = () => {
  const { data } = useAppSelector((store) => store.car);
  const { query } = useRouter();
  const dispatch = useAppDispatch();

  const [carInfo, setCarInfo] = useState<ICar | null>(null);

  const getCarInfoById = () => {
    setCarInfo(data.filter((item) => item.id === query.id)[0]);
  };

  useEffect(() => {
    getCarInfoById();
  }, [carInfo, data]);

  const LikeButton = !carInfo?.liked
    ? <FavoriteBorderIcon /> : <FavoriteIcon sx={{ color: red[900] }} />;

  return (
    <>
      <div className={styles.Car_Info}>

        <div className={styles.Car_Info__Img}>Картинка</div>

        <div>
          <IconButton
            onClick={() => dispatch(changeLiked(carInfo?.id))}
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
      <CarGraph />
    </>
  );
};
export default CarInfo;
