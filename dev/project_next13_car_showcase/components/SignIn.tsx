"use client";
import React, { use, useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

import { hashPasse } from "@sanity/utils/hash";
import { createUser, loginFecth } from "@sanity/utils/produts";
import { User, image, url } from "../types/modele/user";
import { useUserContext } from "@context/user/userContext";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
}

const call = async (user: User) => {
  const det = await createUser(user);
  // console.log(det);
};
const SignIn = ({ isOpen, closeModal }: CarDetailsProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [formData2, setFormData2] = useState({
    email: "",
    password: "",
  });
  const [switchForm, setSwitchForm] = useState(true);
  const { user, login } = useUserContext();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = loginFecth(
      formData2.email,
      hashPasse(formData2.password).toString()
    );
    data.then((response) => {
      if (!response) {
        return alert("Email ou mot de passe incorrect");
      } else {
        login(response);
        closeModal();
        console.log("ok", response);
      }
    });
    console.log();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url: url = {
      url: "",
    };
    const img: image = {
      asset: url,
    };
    let userData: User = {
      _type: "user",
      _id: "_.groups.corePagesEditors",
      _rev: "null",
      _createdAt: null,
      _updatedAt: null,
      name: formData.name,
      pwd: hashPasse(formData.password).toString(),
      slug: "",
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      profil: img,
    };
    //     userData.address = formData.address;
    call(userData);
    //     console.log();

    //     bcrypt.genSalt(10, function (saltError, salt) {
    //       if (saltError) {
    //         return saltError;
    //       } else {
    //         bcrypt.hash(formData.password, salt, function (hasEror, hash) {
    //           if (hasEror) {
    //             return hasEror;
    //           }
    //           return hash;
    //         });
    //       }
    //     })
    // Effectuez la requête pour créer un nouvel utilisateur dans votre backend Sanity
    // Utilisez JavaScript ou une bibliothèque comme Axios pour effectuer la requête AJAX
  };
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
                  {switchForm ? (
                    <div className=" flex gap-3">
                      <div className="container mx-auto mt-10">
                        <h1 className="text-2xl font-bold mb-4">Connexion</h1>
                        <form onSubmit={handlelogin} className="max-w-md">
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="block font-semibold"
                            >
                              Adresse e-mail
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="border rounded px-2 py-1 w-full"
                              value={formData2.email}
                              onChange={handleChange2}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="password"
                              className="block font-semibold"
                            >
                              Mot de passe
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="border rounded px-2 py-1 w-full"
                              value={formData2.password}
                              onChange={handleChange2}
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                          >
                            Se connecter
                          </button>
                        </form>
                        <div
                          className=" cursor-pointer"
                          onClick={() => setSwitchForm(!switchForm)}
                        >
                          vous n'avez pas de compte
                          <span className=" text-primary-blue">S'incrire</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex gap-3">
                      <div className="container mx-auto mt-10">
                        <h1 className="text-2xl font-bold mb-4">Inscription</h1>
                        <form onSubmit={handleSubmit} className="max-w-md">
                          <div className="mb-4">
                            <label
                              htmlFor="name"
                              className="block font-semibold"
                            >
                              Nom complet
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="border rounded px-2 py-1 w-full"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="block font-semibold"
                            >
                              Adresse e-mail
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="border rounded px-2 py-1 w-full"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="password"
                              className="block font-semibold"
                            >
                              Mot de passe
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="border rounded px-2 py-1 w-full"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="address"
                              className="block font-semibold"
                            >
                              Adresse de livraison
                            </label>
                            <textarea
                              id="address"
                              name="address"
                              className="border rounded px-2 py-1 w-full"
                              value={formData.address}
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="phone"
                              className="block font-semibold"
                            >
                              Numéro de téléphone
                            </label>
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              className="border rounded px-2 py-1 w-full"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                          >
                            S'inscrire
                          </button>
                        </form>
                        <div
                          className=""
                          onClick={() => setSwitchForm(!switchForm)}
                        >
                          Vous avez deja un compte{" "}
                          <span className=" text-primary-blue">
                            se connecter
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignIn;
