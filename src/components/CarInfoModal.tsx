import { FC, KeyboardEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import { Car } from "../redux/cars/types";
import { CrossIcon } from "./CrossIcon";
import noImage from "../assets/noImage.png";
import { numberWithCommas } from "../utils/nubmerWithComa";

type Props = Car & {
  closeModal: () => void;
};

export const CarInfoModal: FC<Props> = ({ closeModal, ...props }) => {
  const {
    img,
    make,
    model,
    year,
    rentalPrice,
    address,
    type,
    id,
    accessories,
    fuelConsumption,
    description,
    engineSize,
    functionalities,
    rentalConditions,
    mileage,
  } = props;

  useEffect(() => {
    const close = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    document.body.style.overflowY = "hidden";

    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflowY = "auto";
    };
  }, [closeModal]);
  const rentalConditionArray = rentalConditions.split("\n");
  const rentalConditionMinialAge = rentalConditions.split("\n")[0];
  const rentalConditionAge = rentalConditionMinialAge.split(": ")[1];
  const otherRentalConditions = rentalConditionArray.slice(1);
  return createPortal(
    <div
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
          closeModal();
        }
      }}
      onClick={closeModal}
      className="fixed top-0 right-0 left-0 bottom-0 bg-overlay"
    >
      <div className="fixed top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%] px-9 py-10 rounded-3xl w-[541px] max-h-[700px] overflow-y-scroll overflow-x-hidden">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4"
          type="button"
        >
          <CrossIcon />
        </button>
        <div className="w-[469px] h-[248px] rounded-[14px] relative">
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
        <div className="mt-[14px] mb-[8px]">
          <p className="text-black text-[16px] font-medium leading-[24px]">
            {make} <span className="text-blue">{model}</span>, {year}
          </p>
        </div>
        <div className="flex gap-[4px] flex-col mb-[14px]">
          <div className="flex gap-[6px">
            <p className="catalog-item-desc">{address?.split(", ")[1]}</p>
            <p className="catalog-item-desc">{address?.split(", ")[2]}</p>
            <p className="catalog-item-desc">Id: {id}</p>
            <p className="catalog-item-desc">Year: {year}</p>
            <p className="catalog-item-desc">Type: {type}</p>
          </div>
          <div className="flex gap-[6px]">
            <p className="catalog-item-desc">
              Fuel Consumption: {fuelConsumption}
            </p>
            <p className="catalog-item-desc">Engine Size: {engineSize}</p>
          </div>
        </div>
        <p className="text-black leading-5 mb-6">{description}</p>
        <h3 className="font-semibold leading-5 text-black mb-2">
          Accessories and functionalities:
        </h3>
        <div className="flex gap-[4px] flex-col mb-[14px]">
          <div className="flex gap-[6px]">
            {accessories.map((item) => (
              <p key={item} className="catalog-item-desc">
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-[6px]">
            {functionalities.map((item) => (
              <p key={item} className="catalog-item-desc">
                {item}
              </p>
            ))}
          </div>
        </div>
        <h3 className="font-semibold leading-5 text-black mb-2">
          Rental Conditions:
        </h3>
        <div>
          <div className="flex gap-2 flex-wrap mb-6">
            <p className="condition-item">
              {rentalConditionMinialAge.split(": ")[0]}:{" "}
              <span className="font-semibold text-blue">
                {rentalConditionAge}
              </span>
            </p>
            {otherRentalConditions.map((item) => (
              <p key={item} className="condition-item">
                {item}
              </p>
            ))}
            <p className="condition-item">
              Mileage:
              <span className="font-semibold text-blue">
                {numberWithCommas(mileage)}
              </span>
            </p>
            <p className="condition-item">
              Price:
              <span className="font-semibold text-blue">{rentalPrice}</span>
            </p>
          </div>
        </div>
        <a href="tel:+380730000000" className="button px-[50px]">
          Rental Car
        </a>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};
