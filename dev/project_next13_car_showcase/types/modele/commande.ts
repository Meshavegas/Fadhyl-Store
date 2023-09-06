import { Product } from "./product";

export type ProductInOrder = {
  _type: "object" | null;
  product: Product;
  quantity: number;
};
