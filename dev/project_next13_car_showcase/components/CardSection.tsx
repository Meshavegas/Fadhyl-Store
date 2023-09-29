import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { getProducts } from "@sanity/utils/produts";

interface CardProps {
  title: string;
  description: string;
}

const initialCards: CardProps[] = [
  {
    title: "Card 1",
    description: "Description de la carte 1.",
  },
  {
    title: "Card 2",
    description: "Description de la carte 2.",
  },
  {
    title: "Card 3",
    description: "Description de la carte 3.",
  },
  {
    title: "Card 4",
    description: "Description de la carte 4.",
  },
  {
    title: "Card 5",
    description: "Description de la carte 5.",
  },
  {
    title: "Card 6",
    description: "Description de la carte 6.",
  },
  {
    title: "Card 7",
    description: "Description de la carte 7.",
  },
  {
    title: "Card 8",
    description: "Description de la carte 8.",
  },
  {
    title: "Card 9",
    description: "Description de la carte 9.",
  },
];

const CardSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    // Fonction asynchrone pour effectuer la requête GET
    const fetchData = async () => {
      try {
        const produts = await getProducts();
        setData(produts);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };

    fetchData(); // Appelez la fonction asynchrone
  }, []);

  const visibleCards = expanded ? data : data.slice(0, 4);

  return (
    <div className=" border-2 mx-4 bg-primary-blue border-b-2 border-secondary-orange">
      <div className="border-b-2 border-secondary-orange px-6 py-2">
        <div className=" text-white text-4xl font-extrabold ">pagne blanc</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-4">
        {visibleCards?.map((car, i) => (
          <CarCard produts={car} key={car._id + i} />
        ))}
      </div>

      <button
        className="bg-primary-blue text-white text-3xl font-extrabold px-4 py-2 mt-4 w-full border-t-2 border-secondary-orange"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Réduire" : "Etendre"}
      </button>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CardSection;
