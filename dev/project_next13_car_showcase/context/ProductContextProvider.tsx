import { Product } from "../types/modele/product";
import React, { ReactNode, useState } from "react";
import { ProductContext } from "./productContext";
interface IProps {
  children: ReactNode;
}

const ProductContextProvider = ({ children }: IProps) => {
  const [products, setProduct] = useState<Product[]>([]);
  const addProduct = (product: Product) => {
    setProduct([...products, product]);
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
