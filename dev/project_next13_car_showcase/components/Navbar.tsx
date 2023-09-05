"use client";
import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";
import SignIn from "./SignIn";
import { useState } from "react";
import Login from "./Login";
import { useProductContext } from "@context/productContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const { products } = useProductContext();
  console.log(products);
  return (
    <header className="w-full bg-purple-100 fixed z-40">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-2 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={69}
            height={10}
            className="object-cover"
          />{" "}
          <span className=" text-2xl font-extrabold ml-4">Fadhyl Store</span>
        </Link>

        <div className=" text-2xl">
          <a className="" href="./panier">
            Panier({products.length})
          </a>
        </div>
        {/* <CustomButton
      
        title="S'inscrire"
        btnType="button"
        containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
      /> */}
        <div className="flex gap-3">
          <div
            className=" bg-white text-2xl px-6 py-2 rounded-full font-bold cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            S'inscrire
          </div>
          <div
            className=" bg-secondary-orange text-2xl px-6 py-2 rounded-full font-bold cursor-pointer"
            onClick={() => setIsOpen2(true)}
          >
            LogIn
          </div>
        </div>
      </nav>
      <SignIn isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <Login isOpen={isOpen2} closeModal={() => setIsOpen2(false)} />
    </header>
  );
};

export default NavBar;
