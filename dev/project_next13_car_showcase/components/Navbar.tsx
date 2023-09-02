import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";

const NavBar = () => (
  <header className="w-full bg-slate-700 fixed z-40">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-2 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={69}
          height={18}
          className="object-cover"
        />{" "}
        <span className=" text-2xl font-extrabold ml-4">Fadhyl Store</span>
      </Link>

      <CustomButton
        title="S'inscrire"
        btnType="button"
        containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
      />
    </nav>
  </header>
);

export default NavBar;
