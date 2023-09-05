"use client";
import React, { useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
}
const Login = ({ isOpen, closeModal }: CarDetailsProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                  <div className=" flex gap-3">
                    <div className="container mx-auto mt-10">
                      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
                      <form onSubmit={handleSubmit} className="max-w-md">
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

                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                          Se connecter
                        </button>
                      </form>
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

export default Login;
