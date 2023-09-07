import { Product } from "../../types/modele/product";

import { createClient, groq } from "next-sanity";
import { User } from "../../types/modele/user";
import configC from "@sanity/config/client";

export async function getProducts(): Promise<Product[]> {
  return configC.fetch(
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

export async function createUser(user: User) {
  try {
    const createdUser = await configC.create(user); // Utilisez "await" pour attendre la réponse
    console.log("Utilisateur créé avec succès :", createdUser);
    return createdUser;
  } catch (error) {
    console.log("Erreur lors de la création de l'utilisateur :", error);
    // throw error; // Propagez l'erreur pour la gérer en amont si nécessaire
  }
}

export async function login(email: string, mdp: string) {
  console.log(mdp);
  const query = groq`*[
    _type=="user" && email==$email && pwd==$mdp
  ][0]`;
  configC
    .fetch(query, { email, mdp })
    .then((response) => {
      console.log("doc exiat", response);
    })
    .catch((error) => {
      console.log("Erreur", error);
    });
}
