import { useEffect } from "react";
import { getByMake, getCars } from "../../redux/cars/operations";
import { selectCars, selectPage } from "../../redux/cars/selectors";
import { CarList } from "../../components/CarList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/cars/types";
import { loadMore } from "../../redux/cars/slice";
import Select from "react-select";
import { options } from "../../contants/constants";

export const Catalog = () => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCars(page));
  }, [dispatch, page]);

  const cars = useSelector(selectCars);

  return (
    <div className="flex flex-col justify-center items-center">
      <Select
        isClearable
        classNames={{
          container: () => "w-[224px]",
        }}
        onChange={(value) => {
          if (value?.value) {
            dispatch(getByMake(value?.value));
          } else {
            dispatch(getByMake(""));
          }
        }}
        options={options}
      />
      <CarList
        cars={cars}
        page={page}
        loadMore={() => {
          dispatch(loadMore());
        }}
      />
    </div>
  );
};
