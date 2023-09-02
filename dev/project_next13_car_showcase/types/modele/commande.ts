import { Product } from "./product";

export type ProductInOrder = {
  _type: "object";
  product: Product;
  quantity: number;
};
