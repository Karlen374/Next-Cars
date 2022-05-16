import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import { red } from '@mui/material/colors';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  changeFilter, changeSearchValue, changeVisibleByInterval, showAll, showLiked,
} from '../../store/slices/carSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import styles from './carListHeader.module.scss';

const CarListHeader = () => {
  const { filter, searchValue, LikeButton } = useAppSelector((store) => store.car);

  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number[]>([0, 100000]);
  const minDistance = 1500;

  useEffect(() => {
    if (!LikeButton) setValue([0, 100000]);
  }, [LikeButton]);

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(changeFilter(e.target.value));
  };
  const SearchChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    dispatch(changeSearchValue(e.target.value));
  };

  const changePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const changeLabelFormat = (newValue: number | number[], activeThumb:number) => {
    if (activeThumb === 0) {
      return `от ${newValue} $`;
    }
    return `до ${newValue} $`;
  };

  const ShowBtn = LikeButton ? (
    <Button
      variant="contained"
      onClick={() => dispatch(showAll())}
      color="success"
    >
      Показать все
    </Button>
  ) : (
    <Button
      variant="outlined"
      color="error"
      onClick={() => dispatch(showLiked())}
      endIcon={<FavoriteIcon sx={{ color: red[900] }} />}
    >
      Только
    </Button>
  );

  return (

    <div className={styles.Car_List__Header}>
      <Grid container spacing={4}>
        <Grid item sm={6} lg={3} xs={12}>
          <TextField
            id="outlined-basic"
            label="Поиск"
            onChange={SearchChange}
            value={searchValue}
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6} lg={3} xs={12}>
          {ShowBtn}
        </Grid>
        <Grid item sm={6} lg={3} xs={12}>
          <Box>
            <Slider
              sx={{ color: '#26395d' }}
              value={value}
              onChange={changePrice}
              valueLabelDisplay="on"
              max={100000}
              step={100}
              valueLabelFormat={changeLabelFormat}
              disableSwap
            />
            <Button variant="outlined" onClick={() => dispatch(changeVisibleByInterval(value))}>
              Показать
            </Button>
          </Box>
        </Grid>
        <Grid item sm={6} lg={3} xs={12}>
          <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Фильтр"
                onChange={handleChange}
              >
                <MenuItem value={10}>По Марке</MenuItem>
                <MenuItem value={20}>По Стоимости</MenuItem>
                <MenuItem value={30}>По Году Выпуска</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </div>

  );
};
export default CarListHeader;
