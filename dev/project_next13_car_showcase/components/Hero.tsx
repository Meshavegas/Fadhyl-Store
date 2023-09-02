"use client";

import Image from "next/image";

import { CustomButton } from "@components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Découvrez, Enveloppez, Célébrez - Tissus Africains, à Votre Façon !
        </h1>

        <p className="hero__subtitle">
          Simplifiez votre expérience d'achat de pagne grâce à notre processus
          de commande sans effort.
        </p>

        <CustomButton
          title="Explorer La boutique"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container  rounded-2xl">
        <div className="hero__image">
          <Image
            src="https://cdn.sanity.io/images/2vylmok6/production/a602d35b10648bd7b116953fa62fe1147a46b43a-736x552.jpg"
            alt="hero"
            fill
            className="object-contain rounded-2xl"
          />
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
