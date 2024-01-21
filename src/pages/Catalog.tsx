import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/cars/types";
import { useEffect } from "react";
import { getCars } from "../redux/cars/operations";
import { selectCars } from "../redux/cars/selectors";
import { CatalogItem } from "./components/CatalogItem";

export const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const cars = useSelector(selectCars);

  return (
    <ul className="ml-auto mr-auto list-none flex flex-row flex-wrap gap-[29px] mt-[50px] max-w-[1184px]">
      {cars.map((car) => (
        <CatalogItem key={car.id} {...car} />
      ))}
    </ul>
  );
};
