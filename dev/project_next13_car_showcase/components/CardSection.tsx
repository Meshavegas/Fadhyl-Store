import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { getProducts } from "@sanity/utils/produts";

interface CardProps {
  title: string;
  description: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy of the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index

    // Swap elements at i and j
    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
}

const CardSection: React.FC<{ nom: string }> = (props) => {
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

  const visibleCards = expanded
    ? shuffleArray(data)
    : shuffleArray(data).slice(0, 4);

  return (
    <div className=" border-2 mx-4 bg-primary-blue border-b-2 border-secondary-orange">
      <div className="border-b-2 border-secondary-orange px-6 py-2">
        <div className=" text-white text-4xl font-extrabold ">{props.nom}</div>
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

export default CardSection;
