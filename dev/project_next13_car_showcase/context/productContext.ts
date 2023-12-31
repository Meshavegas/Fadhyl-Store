import { ProductInOrder } from "../types/modele/commande";
import { Product } from "../types/modele/product";
import { createContext, useContext } from "react";

interface IProductContext {
  products: ProductInOrder[];
  addProduct: (product: Product) => void;
  addOneProduct: (product: ProductInOrder[]) => void;
  removeProduct: (id: string) => void;
  removeAllProduct: () => void;
}

export const ProductContext = createContext<IProductContext>({
  products: [],
  addProduct(product) {},
  addOneProduct(product) {},
  removeProduct(id) {},
  removeAllProduct() {},
});

export const useProductContext = () => useContext(ProductContext);
