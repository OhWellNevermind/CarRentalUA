import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavourites } from "../../redux/favourites/operations";
import {
  selectFavouritePage,
  selectFavourites,
} from "../../redux/favourites/selectors";
import { AppDispatch } from "../../redux/cars/types";
import { CarList } from "../../components/CarList";
import { loadMore } from "../../redux/favourites/slice";
import Select from "react-select";
import { getByMake } from "../../redux/cars/operations";
import { options } from "../../contants/constants";

export const Favourites = () => {
  const page = useSelector(selectFavouritePage);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFavourites(page));
  }, [dispatch, page]);

  const cars = useSelector(selectFavourites);

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
