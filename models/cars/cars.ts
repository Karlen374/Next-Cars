import { createEvent, createStore } from 'effector';
import { getLocalStorage } from '../../hooks/hooks';
import { ICar } from '../../types/ICar';

export const addCar = createEvent<ICar>();
export const saveEditCar = createEvent<ICar>();
export const changeLiked = createEvent<string>();
export const changeViewedCar = createEvent<string>();
export const loadCars = createEvent<void>();

export const $cars = createStore<ICar[]>([])
  .on(loadCars, () => JSON.parse(getLocalStorage()?.getItem('data')) || [])

  .on(saveEditCar, (cars, editCar:ICar) => {
    const data = [...cars.filter((item) => item.id !== editCar.id), editCar];
    getLocalStorage()?.setItem('data', JSON.stringify(data));
    return data;
  })

  .on(addCar, (cars, newCar:ICar) => {
    getLocalStorage()?.setItem('data', JSON.stringify([...cars, newCar]));
    return [...cars, newCar];
  })

  .on(changeLiked, (cars, id:string) => {
    const data = cars.map((item) => {
      if (item.id === id) item.liked = !item.liked;
      return item;
    });
    getLocalStorage()?.setItem('data', JSON.stringify(data));
    return data;
  })

  .on(changeViewedCar, (cars, id:string) => {
    const data = cars.filter((item) => {
      if (item.id === id) item.viewed = true;
      return item;
    });
    getLocalStorage()?.setItem('data', JSON.stringify(data));
    return data;
  });
