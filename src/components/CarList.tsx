import { FC } from "react";
import { CatalogItem } from "./CatalogItem";
import { Car } from "../redux/cars/types";

type Props = {
  cars: Car[];
  page: number;
  loadMore: () => void;
};

export const CarList: FC<Props> = ({ cars, page, loadMore }) => {
  return (
    <>
      <ul className="list-none flex flex-row flex-wrap gap-[29px] mt-[50px] max-w-[1184px] mb-[100px]">
        {cars.map((car) => (
          <CatalogItem key={car.id} {...car} />
        ))}
      </ul>
      {page * 12 <= cars.length && (
        <button
          onClick={loadMore}
          type="button"
          className="text-blue hover:text-dark-blue text-[16px] font-medium leading-6 underline self-center mb-[150px]"
        >
          Load more
        </button>
      )}
    </>
  );
};
