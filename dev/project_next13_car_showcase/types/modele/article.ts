import { PortableTextBlock } from "sanity";
import { User } from "./user";
import { ProductInOrder } from "./commande";

export type Order = {
  _type: "order";
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  user: User;
  products: ProductInOrder[];
  total: number;
  isPaid: boolean;
};
