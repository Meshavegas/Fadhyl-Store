import { Product } from "../../types/modele/product";

import { createClient, groq } from "next-sanity";
import { User } from "../../types/modele/user";
import configC from "@sanity/config/client";

export async function getProducts(): Promise<Product[]> {
  return createClient(configC).fetch(
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
  const client = createClient(configC);
  const apiUrl = "https://votre-projet.api.sanity.io/v1/data/query/production";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer sk4hFrE2OsKEO0DGVCIw0rka12qGvhwi6RRkcH1qvXQTzkZXgHmCjt8oQBS8RPOyY3fORkkDAQTDLeDb1j2fHvGQrAh53l4cTuelYNme5W8M6wdXDTCH7pu9J9HZQtLZp3eGg4saZXeYFCo5lE9QCz9Gt53CWslnzb0Dy8B1hisYVN2u3LM0`, // Inclure le token dans l'en-tête
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), // Envoyer la requête GROQ sous forme de JSON
  })
    .then((response) => response.json())
    .then((data) => {
      // Traitez la réponse ici
      console.log(data);
    })
    .catch((error) => {
      // Gérez les erreurs ici
      console.error(error);
    });

  const doct = {
    ...user,
    _type: "system.group",
    grants: [
      {
        filter: "_type == 'corePage'",
        permissions: ["manage"],
      },
    ],
  };
  try {
    client.createIfNotExists(doct).then((res) => {
      return res;
    });
  } catch (error) {
    console.log("Erreur lors de la création de l'utilisateur :", error);
    // throw error;
  }
}
