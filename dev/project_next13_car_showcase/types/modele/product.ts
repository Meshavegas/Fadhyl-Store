import { PortableTextBlock } from "sanity";
import { Category } from "./cathegory";
type url = {
  url: string;
};

type image = {
  asset: url;
};

export type Product = {
  _type: "product";
  _id: string;
  _rev: string;
  _createdAt: Date;
  name: string;
  slug: string;
  description: PortableTextBlock[];
  price: string;
  stock: number;
  category: Category[];
  images: image[];
};
