import React, {
  useEffect, forwardRef, useState, ForwardRefExoticComponent, RefAttributes,
} from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import NumberFormat from 'react-number-format';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { closeModal, addNewCar, saveEditCar } from '../../../store/slices/carSlice';
import { useAppSelector } from '../../../hooks/hooks';
import Modal from '../modal/modal';
import { IParams, OptionType } from './OptionType';
import styles from './createAdvertisement.module.scss';

const filter = createFilterOptions<OptionType>();

const brands: readonly OptionType[] = [
  { title: 'BMW' },
  { title: 'Ferrari' },
  { title: 'Volvo' },
];
const models: readonly OptionType[] = [
  { title: 'x5' },
  { title: 's60' },
  { title: 'enzo' },
  { title: 'm5' },
];

interface CustomProps {
  onChange: (event: { target: { value: string } }) => void;

}

const NumberFormatCustom = forwardRef<ForwardRefExoticComponent<CustomProps & RefAttributes<any>>, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(NewPrice) => {
          onChange({
            target: {
              value: NewPrice.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  },
);

const CreateAdvertisement = () => {
  const dispatch = useDispatch();
  const { selectedCar } = useAppSelector((store) => store.car);

  const [releaseYear, setReleaseYear] = useState<number | string>('');
  const [price, setPrice] = useState<string>('');
  const [brand, setBrand] = useState<OptionType | string>('');
  const [model, setModel] = useState<OptionType | string>('');
  const [description, setDescription] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCar.id) {
      setReleaseYear(selectedCar.releaseYear);
      setPrice(String(selectedCar.price));
      setBrand(selectedCar.brand);
      setModel(selectedCar.model);
      setDescription(selectedCar.description);
    }
  }, []);

  const changeDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const changePrice = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setPrice(e.target.value);
  };

  const changeReleaseYear = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setReleaseYear(e.target.value);
  };

  const closeAddForm = () => {
    if (releaseYear || price || brand || model || description) {
      setConfirmModal(true);
    } else dispatch(closeModal());
  };

  const getOptionLabel = (option:string | OptionType) => {
    if (typeof option === 'string') {
      return option;
    }

    if (option.inputValue) {
      return option.inputValue;
    }

    return option.title;
  };

  const filterOptions = (options: OptionType[], params:IParams) => {
    const filtered = filter(options, params);

    const { inputValue } = params;

    const isExisting = options.some((option) => inputValue === option.title);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        title: `Добавить "${inputValue}"`,
      });
    }

    return filtered;
  };
  const saveDataCar = () => {
    const updBrand = (typeof brand === 'string') ? brand : brand.title;

    const updModel = (typeof model === 'string') ? model : model.title;

    let upPrice = '';

    for (let i = 0; i < price.length; i++) {
      if (price[i] !== ' ') upPrice += price.slice(i, i + 1);
    }

    const index = selectedCar.id ? selectedCar.id : uuid();

    const car = {
      id: index,
      brand: updBrand,
      model: updModel,
      price: upPrice,
      releaseYear,
      description,
      viewed: false,
      liked: false,
    };

    if (!selectedCar.id) dispatch(addNewCar(car));
    else dispatch(saveEditCar(car));
    dispatch(closeModal());
  };

  const closeModals = () => {
    setBrand('');
    setDescription('');
    setPrice('');
    setModel('');
    setReleaseYear('');
    setConfirmModal(false);
    dispatch(closeModal());
  };

  const saveBtn = (releaseYear && price && Number(price) < 100000 && model && brand && description)
    ? <Button onClick={() => saveDataCar()} variant="outlined" color="success">Сохранить</Button>
    : <Button variant="outlined" disabled>Сохранить</Button>;

  const modalHeader = selectedCar.id
    ? <h2>Редактировать Объявление</h2> : <h2>Разместить Объявление</h2>;

  return (
    <>
      <Modal active={confirmModal}>
        <div>
          <h2>При Отмене все введенные данные потеряются</h2>
          <Button
            variant="contained"
            color="success"
            onClick={() => setConfirmModal(false)}
          >
            вернутся к заполнению
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => closeModals()}
          >
            Все равно отменить
          </Button>
        </div>
      </Modal>

      <div className={styles.Add_Form}>
        {modalHeader}

        <Grid container spacing={2}>

          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              id="outlined-basic"
              value={releaseYear}
              onChange={changeReleaseYear}
              label="год выпуска"
              variant="outlined"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              label="цена:(Макс:100000$)"
              value={price}
              onChange={changePrice}
              id="outlined-basic"
              InputProps={{
                inputComponent: NumberFormatCustom as any,
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Autocomplete
              value={brand}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setBrand({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  setBrand({
                    title: newValue.inputValue,
                  });
                } else {
                  setBrand('');
                }
              }}
               // @ts-ignore
              filterOptions={(options, params) => filterOptions(options, params)}
              selectOnFocus
              autoSelect
              id="free-solo-with-text-demo"
              options={brands}
              getOptionLabel={(option) => getOptionLabel(option)}
               // @ts-ignore
              renderOption={(props, option) => <li {...props}>{option.title}</li>}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Марка" />
              )}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Autocomplete
              value={model}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setModel({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  setModel({
                    title: newValue.inputValue,
                  });
                } else {
                  setModel('');
                }
              }}
              // @ts-ignore
              filterOptions={(options, params) => filterOptions(options, params)}
              autoSelect
              selectOnFocus
              id="free-solo-with-text-demo"
              options={models}
              getOptionLabel={(option) => getOptionLabel(option)}
               // @ts-ignore
              renderOption={(props, option) => <li {...props}>{option.title}</li>}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Модель" />
              )}
            />
          </Grid>

        </Grid>
        <div className={styles.Add_Form__textarea}>

          <TextareaAutosize
            minRows={4}
            placeholder="Описание машины"
            style={{ maxWidth: 500, width: 205 }}
            value={description}
            onChange={changeDescription}
          />

        </div>

        <div className={styles.Add_Form__Button}>
          {saveBtn}
          <Button onClick={() => closeAddForm()} variant="outlined" color="error">Отменить</Button>
        </div>

      </div>
    </>

  );
};
export default CreateAdvertisement;