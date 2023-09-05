import { useProductContext } from "@context/productContext";
import React from "react";

const ProductContainer = () => {
  const { products } = useProductContext();
  return <div>ProductContainer</div>;
};

export default ProductContainer;
