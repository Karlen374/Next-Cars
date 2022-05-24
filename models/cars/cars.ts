import { createEvent, createStore, combine } from 'effector';
import { ISearchParams } from '../../types/ISearchParams';
import { getLocalStorage } from '../../hooks/hooks';
import { ICar } from '../../types/ICar';

export const addCar = createEvent<ICar>();
export const saveEditCar = createEvent<ICar>();
export const changeLiked = createEvent<string>();
export const changeViewedCar = createEvent<string>();
export const loadCars = createEvent();
export const changeSearchInput = createEvent<string>();
export const changeShowByLikedBtn = createEvent<void>();
export const changeFilterValue = createEvent<string>();
export const changeVisibleArrayInterval = createEvent<object>();

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

export const $searchParams = createStore<ISearchParams>({
  input: '',
  liked: false,
  changeFilter: '',
  changeArrayInterval: [0, 10000],
})
  .on(changeSearchInput, (searchParams, searchInput:string) => {
    return { ...searchParams, input: searchInput };
  })
  .on(changeShowByLikedBtn, (searchParams) => {
    return { ...searchParams, liked: !searchParams.liked };
  })
  .on(changeFilterValue, (searchParams, filterValue:string) => {
    return { ...searchParams, changeFilter: filterValue };
  })
  .on(changeVisibleArrayInterval, (searchParams, Array:object) => {
    return { ...searchParams, changeArrayInterval: Array };
  });

export const $viewedCars = combine($cars, $searchParams, (cars, searchParams) => {
  let filteredCars = cars;
  if (searchParams.input) {
    filteredCars = filteredCars.filter((item) => {
      const searchMarkers = `${item.brand} ${item.model} ${item.releaseYear} ${
        item.brand} ${item.releaseYear} ${item.model} ${
        item.model} ${item.releaseYear} ${item.brand} ${
        item.model} ${item.brand} ${item.releaseYear} ${
        item.releaseYear} ${item.brand} ${item.model} ${
        item.releaseYear} ${item.model} ${item.brand}`;

      return searchMarkers.toUpperCase().indexOf(searchParams.input.toUpperCase()) > -1;
    });
  }
  if (searchParams.liked) {
    filteredCars = filteredCars.filter((item) => item.liked);
  }
  if (searchParams.changeFilter) {
    if (searchParams.changeFilter === '10') {
      filteredCars = filteredCars.sort((a, b) => (a.brand.toLowerCase() > b.brand.toLowerCase() ? 1 : -1));
    }
    if (searchParams.changeFilter === '20') {
      filteredCars = filteredCars.sort((a, b) => (a.price - b.price));
    }
    if (searchParams.changeFilter === '30') {
      filteredCars = filteredCars.sort((a, b) => (a.releaseYear - b.releaseYear));
    }
  }
  if (searchParams.changeArrayInterval[0] !== 0 || searchParams.changeArrayInterval[1] !== 10000) {
    /* eslint-disable*/
    filteredCars = filteredCars.filter((item) => {
      if (searchParams.changeArrayInterval[0] <= item.price && searchParams.changeArrayInterval[1] >= item.price) {
        return item;
      }
    });
  }
  return filteredCars;
});

