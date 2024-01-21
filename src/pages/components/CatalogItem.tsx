import { FC, useState } from "react";
import { Car } from "../../redux/cars/types";
import { HeartIcon } from "../../components/HeartIcon";
import { CarInfoModal } from "../../components/CarInfoModal";
import noImage from "../../assets/noImage.png";

export const CatalogItem: FC<Car> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    img,
    make,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    id,
    accessories,
  } = props;

  return (
    <li className="flex flex-col w-[274px]">
      <div className="h-[268px] rounded-[14px] relative">
        <button className="absolute top-[14px] right-[14px]" type="button">
          <HeartIcon />
        </button>
        {img ? (
          <img
            className="block w-full rounded-[14px] h-full object-cover"
            src={img}
          />
        ) : (
          <img
            className="block w-full rounded-[14px] h-full object-contain"
            src={noImage}
          />
        )}
      </div>
      <div className="flex justify-between mt-[14px] mb-[8px]">
        <p className="text-black text-[16px] font-medium leading-[24px] text-ellipsis max-w-[200px] text-nowrap overflow-hidden">
          {make} <span className="text-blue">{model}</span>, {year}
        </p>
        <p className="text-black text-[16px] font-medium leading-[24px]">
          {rentalPrice}
        </p>
      </div>
      <div className="flex gap-[6px] flex-col">
        <div className="flex max-h-[18px] gap-[6px] flex-wrap">
          <p className="catalog-item-desc">{address?.split(", ")[1]}</p>
          <p className="catalog-item-desc">{address?.split(", ")[2]}</p>
          <p className="catalog-item-desc">{rentalCompany}</p>
        </div>
        <div className="flex max-h-[18px] gap-[6px] flex-wrap">
          <p className="catalog-item-desc">{type}</p>
          <p className="catalog-item-desc">{model}</p>
          <p className="catalog-item-desc">{id}</p>
          {accessories?.length ? (
            <p className="catalog-item-desc text-ellipsis max-w-[90px] overflow-hidden">
              {accessories[0]}
            </p>
          ) : null}
        </div>
      </div>
      <button onClick={() => setIsOpen(true)} type="button" className="button">
        Learn more
      </button>
      {isOpen && (
        <CarInfoModal
          {...props}
          closeModal={() => {
            setIsOpen(false);
          }}
        />
      )}
    </li>
  );
};
