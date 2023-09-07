import { PortableTextBlock } from "sanity";
export type User = {
  _type: "user";
  _id: string;
  _rev: string;
  _createdAt: string | null;
  _updatedAt: string | null;
  name: string;
  pwd: string;
  slug: string;
  email: string;
  address: string;
  phone?: string | null;
};
