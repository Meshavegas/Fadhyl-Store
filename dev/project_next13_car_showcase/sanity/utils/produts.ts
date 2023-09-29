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

const client = {
  projectId: "2vylmok6",
  dataset: "production",
  useCdn: true,
  token:
    "skQjnZcmtqAl8IBjbGwvMk0zJuENpePdRRIW3rEUzlY6gYjizzT7M8oozFTCGwW4X7qaxd4PqwydIWT3k2kweGdXQq92HNYknwC54wEE3hcGs9D1vuqnlL9PeGeGoKk4PYaFA9tScO1XySrezyyQMK7DGTlKz95tgOBq2S6hx4ugJiZeZG2C",
};
const conf = createClient(client);
export async function createUser(user: User) {
  const { _id, name, pwd, slug, email, address, phone, profil } = user;
  try {
    conf
      .create({
        _type: "user",
        name,
        pwd,
        slug,
        email,
        address,
        phone,
        profil,
      })
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        return false;
        console.error(err);
      });
  } catch (error) {
    console.log(
      "Erreur lors de la création de l'utilisateur :+++++++++++++++++",
      error
    );
    // throw error; // Propagez l'erreur pour la gérer en amont si nécessaire
  }
}

export async function loginFecth(
  email: string,
  mdp: string
): Promise<User | null> {
  // console.log(mdp);
  try {
    const query = groq`*[
    _type=="user" && email==$email && pwd==$mdp
  ][0]`;
    const response = await configC.fetch(query, { email, mdp });
    if (response) {
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur", error);
    throw error;
  }
}
