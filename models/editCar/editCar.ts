import { createEvent, createStore } from 'effector';
import { ICar } from '../../types/ICar';
import { getLocalStorage } from '../../hooks/hooks';

export const selectEditCar = createEvent<string>();
export const setSelectEditCar = createEvent<void>();

export const $selectedCar = createStore<ICar>(null)
  .on(selectEditCar, (selectedCar, id:string) => {
    const cars = JSON.parse(getLocalStorage()?.getItem('data'));
    return cars.filter((item) => item.id === id)[0];
  })
  .reset(setSelectEditCar);
