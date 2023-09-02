import { config } from "@sanity,config";
import { Product } from "../../types/modele/product";

import { createClient, groq } from "next-sanity";

export async function getProducts(): Promise<Product[]> {
  return createClient(config).fetch(
    groq`*[_type == "product"]{
       _id,name,"slug":slug.current,
  description,
  price,
  stock,
  "category": category[],
  "images": images[]{
                     asset->{url,}, alt
                     }
    }`
  );
}
