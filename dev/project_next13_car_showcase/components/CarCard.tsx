"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import { Product } from "../types/modele/product";

interface CarCardProps {
  produts: Product;
}

const CarCard = ({ produts }: CarCardProps) => {
  const { name, description, price, stock, category, images, _createdAt } =
    produts;

  const [isOpen, setIsOpen] = useState(false);
  // console.log(produts);

  // const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group cursor-pointer">
      <div className="car-card__content">
        <h2 className="car-card__content-title">{name}</h2>
      </div>

      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          xaf
        </span>
        {price}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          /yard
        </span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain ">
        <Image
          src={images[0].asset.url}
          alt="car model"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div> */}

      {/* <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={produts} /> */}
    </div>
  );
};

export default CarCard;
