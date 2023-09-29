"use client";
import { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { CarProps } from "@types";
import { generateCarImageUrl } from "@utils";
import { Product } from "../types/modele/product";
import { PortableText } from "@portabletext/react";
import { useProductContext } from "@context/productContext";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: Product;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const formattedPrice = new Intl.NumberFormat("cm-CM", {
    style: "currency",
    currency: "XAF",
  });
  const { addProduct } = useProductContext();
  const handleAdd = () => {
    addProduct(car);
  };
  // Expected output: "123.456,79 €"
  // const intl = useIntl();
  // const formattedPrice = (price: number) =>
  //   intl.formatNumber(price, { style: "currency", currency: "XAF" });
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 w-full" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto border">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModal}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className=" flex gap-3">
                    <div className="w-2/3">
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="relative w-full h-[200px] bg-pattern bg-cover bg-center rounded-lg">
                          <Image
                            src={car.images[0].asset.url}
                            alt="car model"
                            fill
                            priority
                            className="object-cover"
                          />
                        </div>

                        <div className="flex gap-3">
                          {car.images.map((p, i) => (
                            <div
                              className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg"
                              key={i + p.asset?.url}
                            >
                              <Image
                                src={p.asset?.url}
                                alt="car model"
                                fill
                                priority
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <h2 className="font-semibold text-xl capitalize">
                          {car.name}
                        </h2>
                      </div>
                      <PortableText value={car.description} />
                    </div>
                    <div className="mt-3 w-1/3">
                      {/* price */}
                      <div className=" line-through text-amber-950">
                        {formattedPrice.format(car.price * 0.3 + car.price)}
                      </div>
                      <div className=" text-3xl text-amber-950 font-bold">
                        {formattedPrice.format(car.price)}
                      </div>
                      <div
                        onClick={handleAdd}
                        className=" mt-3 cursor-pointer bg-primary-blue rounded-xl px-4 py-2 text-white text-2xl font-bold text-center"
                      >
                        Ajouter au panier
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
