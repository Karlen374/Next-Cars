import Link from 'next/link';
import Grid from '@mui/material/Grid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { red, green } from '@mui/material/colors';
import { useAppDispatch } from '../../../hooks/hooks';
import { ICar } from '../../../models/ICar';
import {
  selectedCarInfo, openModal, changeLiked, changeViewed,
} from '../../../store/slices/carSlice';
import styles from './carItems.module.scss';

interface CarItemsProps {
  data:ICar[];
}

const CarItems = ({ data }:CarItemsProps) => {
  const dispatch = useAppDispatch();

  const changeViewedCar = (id:string) => {
    dispatch(changeViewed(id));
  };

  const editCarInfo = (id:string) => {
    dispatch(selectedCarInfo(id));
    dispatch(openModal());
  };

  const content = data.map((item:ICar) => {
    const LikeButton = item.liked
      ? <FavoriteIcon sx={{ color: red[900] }} /> : <FavoriteBorderIcon />;

    const ItemStyle = item.viewed ? `${styles.Items_Block} ${styles.Viewed}` : `${styles.Items_Block}`;

    return (
      <CSSTransition
        key={item.id}
        timeout={1000}
        classNames="item"
      >
        <Grid item md={4} sm={6} lg={3} xs={12}>

          <div className={ItemStyle}>
            <div>
              Марка -
              {item.brand}
            </div>
            <div>
              Модель -
              {item.model}
            </div>
            <div>
              Стоимость -
              {item.price}
              {' '}
              $
            </div>
            <div>
              Год Выпуска -
              {item.releaseYear}
              г.
            </div>
            <IconButton
              className={styles.Items_Block__Like__Btn}
              onClick={() => dispatch(changeLiked(item.id))}
              aria-label="add to favorites"
            >
              {LikeButton}
            </IconButton>
            <Link href={`/${item.id}`}>
              <Button
                variant="outlined"
                size="small"
                color="success"
                onClick={() => changeViewedCar(item.id)}
              >
                Подробнее
              </Button>
            </Link>

            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() => editCarInfo(item.id)}
              endIcon={<EditIcon sx={{ color: green[700] }} />}
            >
              редактировать
            </Button>
          </div>

        </Grid>
      </CSSTransition>
    );
  });
  return (
    <TransitionGroup className="css-zow5z4-MuiGrid-root">
      {content}
    </TransitionGroup>

  );
};

export default CarItems;
