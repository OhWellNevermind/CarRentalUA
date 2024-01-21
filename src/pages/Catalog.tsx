import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/cars/types";
import { useEffect } from "react";
import { getCars } from "../redux/cars/operations";
import { selectCars, selectPage } from "../redux/cars/selectors";
import { CatalogItem } from "./components/CatalogItem";
import { loadMore } from "../redux/cars/slice";

export const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage);
  useEffect(() => {
    dispatch(getCars(page));
  }, [dispatch, page]);

  const cars = useSelector(selectCars);

  return (
    <div className="flex flex-col justify-center items-center">
      <ul className="list-none flex flex-row flex-wrap gap-[29px] mt-[50px] max-w-[1184px] mb-[100px]">
        {cars.map((car) => (
          <CatalogItem key={car.id} {...car} />
        ))}
      </ul>
      {page * 12 <= cars.length && (
        <button
          onClick={() => dispatch(loadMore())}
          type="button"
          className="text-blue text-[16px] font-medium leading-6 underline self-center mb-[150px]"
        >
          Load more
        </button>
      )}
    </div>
  );
};
