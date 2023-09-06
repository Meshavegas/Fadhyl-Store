"use client";
import { Product } from "../types/modele/product";
import React, { ReactNode, useState } from "react";
import { ProductContext } from "./productContext";
import { ProductInOrder } from "../types/modele/commande";
interface IProps {
  children: ReactNode;
}

const ProductContextProvider = ({ children }: IProps) => {
  const [products, setProduct] = useState<ProductInOrder[]>([]);
  const addProduct = (product: Product) => {
    const existingProduct = products.find(
      (item) => item.product._id === product._id
    );

    if (existingProduct) {
      // Si le produit existe déjà, augmentez la quantité
      const updatedProducts = products.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setProduct(updatedProducts);
    } else {
      const newProduct: ProductInOrder = {
        _type: null,
        product: product,
        quantity: 1,
      };
      setProduct([...products, newProduct]);
    }
  };
  const addOneProduct = (p: ProductInOrder[]) => {
    setProduct(p);
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        addOneProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
