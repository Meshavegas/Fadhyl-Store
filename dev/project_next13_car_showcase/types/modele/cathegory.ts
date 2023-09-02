import { PortableTextBlock } from "sanity";
export type Category = {
  _type: "category";
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: string;

  description: PortableTextBlock[];
};
