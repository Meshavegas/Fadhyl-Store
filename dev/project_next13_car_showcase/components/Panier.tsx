"use client";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { useProductContext } from "@context/productContext";
import { useUserContext } from "@context/user/userContext";
import { createOrder } from "@sanity/utils/produts";
import axios from "axios";
const formattedPrice = new Intl.NumberFormat("cm-CM", {
  style: "currency",
  currency: "XAF",
});
interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  openLogin: () => void;
}
const Panier = ({ isOpen, closeModal, openLogin }: CarDetailsProps) => {
  const { products, removeAllProduct, addOneProduct, removeProduct } =
    useProductContext();
  const { user } = useUserContext();

  const [datas, setData] = useState({});
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // const [screenSize, setScreenSize] = useState(window.screen.width);

  // state pour validations
  const [showValidation, setShowValidation] = useState(false);

  const [valid, setValid] = useState(false);
  const [errorPayement, setErrorPayement] = useState("");
  const [successPayement, setSuccessPayement] = useState("");
  const [references, setReferences] = useState("");
  // const [timerValue, setTimerValue] = useState();
  const [payCounter, setPayCounter] = useState(300);

  const initialFormData = {
    email: user?.email || "", // Utilisez l'opérateur de nullish coalescing (??) pour fournir une valeur par défaut
    ville: "Ville...",
    tel: user?.phone || "",
    quartier: user?.address || "",
    nom: user?.name || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const closeM = () => {
    setCurrentStep(1);
    closeModal();
  };
  useEffect(() => {
    // Vous n'avez pas besoin de recopier toutes les valeurs, mettez à jour simplement 'email' et 'tel'
    setFormData({
      ...formData,
      email: user?.email || "",
      tel: user?.phone || "",
      quartier: user?.address || "",
      nom: user?.name || "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const incrementQuantity = (productId: string) => {
    const updatedProducts = products.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    addOneProduct(updatedProducts);
  };

  const handleCommader = () => {
    if (user) {
      setCurrentStep(2);
    } else {
      closeModal();
      openLogin();
    }
  };
  const decrementQuantity = (productId: string) => {
    const updatedProducts = products.map((item) => {
      if (item.quantity - 1 === 0) {
        return item;
      } else {
        return item.product._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      }
    });
    addOneProduct(updatedProducts);
  };

  let timer: NodeJS.Timeout | undefined;
  let payTimer: NodeJS.Timeout | undefined;

  const payCheck = async (preference: string) => {
    try {
      const res = await axios.get(
        `https://faroty-api.tanouacademy.com/api/v1/check/${preference}`
      );

      const data = await res.data;

      if (!data.error) {
        return true;
      } else if (data.error_msg === "no_payment_received") {
        return false;
      } else if (data.error_msg === "payment_request_pending") {
        return null;
      } else if (data.error_msg === "no_pay_request_found") {
        return false;
      }
    } catch (error) {
      // Gérez les erreurs d'exception ici
      return null;
    }
  };

  const onPaySubmit = async (status: boolean | undefined) => {
    stopPayTimer();

    setReferences("");
    setCurrentStep(3);

    if (status) {
      // alert('Votre vote a été pris en compte')
      setIsSuccess(true);
      removeAllProduct();
      setLoading(false);
      await createOrder(
        user?._id,
        products,
        (3000 + totalCartValue()) * 0.1923 + 3000 + totalCartValue(),
        true
      );
    } else {
      setIsSuccess(false);
      setLoading(false);
      await createOrder(
        user?._id,
        products,
        (3000 + totalCartValue()) * 0.1923 + 3000 + totalCartValue(),
        false
      );
    }
  };

  const timerValues = () => {
    const minutes = Math.floor(payCounter / 60);
    const seconds = payCounter % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const initPayTimer = () => {
    setShowValidation(true);
    payTimer = setInterval(() => {
      setPayCounter((prevCounter) => prevCounter - 1);
    }, 1000);
  };

  const stopPayTimer = () => {
    clearInterval(payTimer);
    setPayCounter(5 * 60);
  };

  const initInterval = (preference: string) => {
    let count = 0;
    timer = setInterval(async () => {
      // console.log(preference);

      const status = await payCheck(preference);
      if (status !== null) {
        console.log("satus+++++++++++", status);
        clearInterval(timer);
        onPaySubmit(status);
      }
      count++;

      if (count >= 5) {
        clearInterval(timer);
        onPaySubmit(false);
      }
    }, 10000);
  };

  const handleSubmitPayement = async () => {
    setErrorPayement("");
    setLoading(true);
    //
    try {
      const response = await axios.post(
        "https://faroty-api.tanouacademy.com/api/v1/join",
        {
          fhid: "1724627979",
          amount: (3000 + totalCartValue()) * 0.1923 + 3000 + totalCartValue(),
          fullname: formData.nom,
          city: formData.quartier,
          phone: formData.tel + "",
        }
      );

      const responseData = await response.data;

      if (responseData.error) {
        setErrorPayement(responseData.message);
        setLoading(false);
      } else {
        setValid(true);
        setReferences(responseData.data.reference);
        initInterval(responseData.data.reference);
        initPayTimer();
      }
    } catch (error) {
      console.log(error);
      setErrorPayement(
        "Une erreur est survenue lors de l'execution de la requête."
      );
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // console.log(formData, user, products);
    setLoading(true);
    handleSubmitPayement();
    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++"
      // await createOrder(
      //   user?._id,
      //   products,
      //   (3000 + totalCartValue()) * 0.1923 + 3000 + totalCartValue(),
      //   false
      // )
    );

    // Effectuez la requête pour créer un nouvel utilisateur dans votre backend Sanity
    // Utilisez JavaScript ou une bibliothèque comme Axios pour effectuer la requête AJAX
  };

  const [currentStep, setCurrentStep] = useState(1);

  const totalCartValue = () => {
    let totalPrice = 0;

    for (const item of products) {
      const { product, quantity } = item;
      totalPrice += product.price * quantity;
    }

    return totalPrice;
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 w-full" onClose={closeM}>
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

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-85 x-0"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{
                    width: "110%",
                    height: "85vh",
                    background: "#fff",
                    minHeight: "80%",
                    borderTopLeftRadius: "30px",
                    borderTopRightRadius: "30px",
                  }}
                  // className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5"
                >
                  <span
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeM}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </span>
                  {currentStep === 1 && (
                    <div className=" flex gap-5 justify-center items-center h-full md:flex-row flex-col">
                      <div
                        className=" bg-300 md:w-2/5 w-[80%] h-full"
                        style={{ height: "60vh", overflowY: "auto" }}
                      >
                        {products.map((e, i) => (
                          <div
                            className=" flex h-[170px] justify-center items-center border-b"
                            key={i}
                          >
                            <div className="relative w-1/5 h-[100px] bg-pattern bg-cover bg-center rounded-lg">
                              <Image
                                src={e.product.images[0].asset.url}
                                alt="model"
                                fill
                                priority
                                className="object-cover"
                              />
                            </div>
                            <div className=" ml-10 w-4/5 px-2 ">
                              <div className=" text-2xl font-bold flex justify-between items-start w-full  ">
                                <div className="">{e.product.name}</div>
                                <div
                                  className=" cursor-pointer"
                                  onClick={() => removeProduct(e.product._id)}
                                >
                                  X
                                </div>
                              </div>
                              <div className="w-fit">
                                <span className="">Prix :</span>
                                <span className=" font-bold text-xl ">
                                  {formattedPrice.format(e.product.price)}
                                </span>
                              </div>
                              <div className=" flex justify-between">
                                <div className=" border w-fit flex">
                                  <div
                                    onClick={() =>
                                      decrementQuantity(e.product._id)
                                    }
                                    className=" bg-black text-2xl text-white px-2 rounded-l-lg cursor-pointer"
                                  >
                                    -
                                  </div>
                                  <span className="px-5 text-2xl">
                                    {e.quantity}
                                  </span>
                                  <div
                                    onClick={() =>
                                      incrementQuantity(e.product._id)
                                    }
                                    className="bg-black text-2xl text-white px-2 rounded-r-lg cursor-pointer"
                                  >
                                    +
                                  </div>
                                </div>
                                <div className="">
                                  {formattedPrice.format(
                                    e.product.price * e.quantity
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className=" w-[80%] md:w-1/4 border-2">
                        <h3 className="text-center mt-6 text-3xl font-bold">
                          Total : {formattedPrice.format(totalCartValue())}
                        </h3>
                        <div
                          onClick={handleCommader}
                          className=" bg-primary-blue text-white text-3xl py-2 hover:bg-secondary-orange cursor-pointer"
                        >
                          Commander
                        </div>
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="flex gap-6 justify-center  items-center h-full md:flex-row flex-col  flex-wrap">
                      <div className="md:w-1/4 text-2xl font-bold flex-col gap-4">
                        <div className="flex justify-between ">
                          <div className="">Sous totalt : </div>
                          <div className="">
                            {formattedPrice.format(totalCartValue())}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="">Livraison :</div>
                          <div className="">3,000</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="">Tax : </div>
                          <div className="">
                            {Math.floor((3000 + totalCartValue()) * 0.1923)}
                          </div>
                        </div>
                        <div
                          className=" border-b-4 m-h-2 border-black"
                          style={{ borderBottom: "2px solid black" }}
                        ></div>
                        <div className="flex justify-between">
                          <div className="">Grand total</div>
                          <div className="">
                            {formattedPrice.format(
                              (3000 + totalCartValue()) * 0.1923 +
                                3000 +
                                totalCartValue()
                            )}
                          </div>
                        </div>
                      </div>
                      <div className=" border-t-orange-100 border-t-4 w-[95%] md:w-1/4">
                        <div className=" text-3xl font-bold flex justify-between">
                          <div
                            className=" text-3xl font-extrabold bg-red-500  rounded-full text-white px-2 cursor-pointer"
                            onClick={() => setCurrentStep(1)}
                          >
                            {"<"}
                          </div>
                          Entree les informations
                        </div>
                        <div>
                          <div className="mb-4">
                            <label
                              htmlFor="nom"
                              className="block font-semibold text-left"
                            >
                              Nom Complet
                            </label>
                            <input
                              type="text"
                              id="nom"
                              name="nom"
                              className="border rounded px-2 py-1 w-full"
                              value={formData.nom}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="block font-semibold text-left"
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
                              htmlFor="ville"
                              className="block font-semibold text-left"
                            >
                              Ville
                            </label>
                            <select
                              className="block font-semibold w-full border-2 py-1"
                              value={formData.ville}
                              onChange={handleChange}
                            >
                              <option value="yaounde">Yaoundé</option>
                              <option value="douala">Douala</option>
                              <option value="bamenda">Bamenda</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="quartier"
                              className="block font-semibold text-left"
                            >
                              Quartier
                            </label>
                            <input
                              type="text"
                              id="quartier"
                              name="Adresse"
                              className="border rounded px-2 py-1 w-full"
                              value={formData.quartier}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4 text-left">
                            <label
                              htmlFor="tel"
                              className="block font-semibold"
                            >
                              Numero OM ou MTN
                            </label>
                            <input
                              type="tel"
                              id="tel"
                              name="tel"
                              className="border rounded px-2 py-1 w-full"
                              value={formData.tel}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        {loading ? (
                          <div className="w-full  p-3 cursor-wait bg-[#a9bcc7] flex gap-3 justify-between">
                            <div
                              className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
                        aspect-square w-8 flex justify-center items-center text-yellow-700"
                            ></div>
                            <div className=" text-white text-2xl">
                              Traitement....
                            </div>
                            <div className=" text-white text-2xl">
                              {timerValues()}
                            </div>
                          </div>
                        ) : (
                          <div
                            className=" w-full border text-2xl text-white p-3 cursor-pointer bg-primary-blue"
                            onClick={handleSubmit}
                          >
                            Valider la commander
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="flex gap-6 justify-center  items-center h-full md:flex-row flex-col  flex-wrap">
                      {isSuccess ? (
                        <div className=" flex flex-col justify-center items-center">
                          <Image
                            src="/sucess.gif"
                            alt="logo"
                            width={69}
                            height={10}
                            className="object-cover"
                          />
                          <h1 className=" text-2xl font-bold">
                            Votre commande a ete enregistrer
                          </h1>
                        </div>
                      ) : (
                        <div className=" flex flex-col justify-center items-center">
                          <Image
                            src="/error.gif"
                            alt="logo"
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                          <h1 className=" text-2xl font-bold">
                            Une erreur s'est produite
                          </h1>
                        </div>
                      )}
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

export default Panier;
