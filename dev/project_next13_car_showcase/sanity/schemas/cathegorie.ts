import { User, defineType } from "sanity";

export const cathegorie = defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nom de la catégorie",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "description",
      title: "Description de la catégorie",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});

// Schéma pour un produit
export const produit = defineType({
  name: "product",
  title: "Produit",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nom du produit",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "description",
      title: "Description du produit",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "price",
      title: "Prix",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "stock",
      title: "Stock disponible",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "category",
      title: "Catégorie du produit",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      title: "Images du produit",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
});

export const commande = defineType({
  name: "order",
  title: "Commande",
  type: "document",
  fields: [
    {
      name: "user",
      title: "Utilisateur",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "products",
      title: "Produits de la commande",
      type: "array",
      of: [{ type: "productInOrder" }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "total",
      title: "Montant total",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "isPaid",
      title: "Payée",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
  ],
});

export const article = defineType({
  name: "productInOrder",
  title: "Produit dans une commande",
  type: "object",
  fields: [
    {
      name: "product",
      title: "Produit",
      type: "reference",
      to: [{ type: "product" }],
    },
    {
      name: "quantity",
      title: "Quantité",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
  ],
});

export const user = defineType({
  name: "user",
  title: "Utilisateur",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pwd",
      title: "Mot de passe",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "email",
      title: "Adresse e-mail",
      type: "email",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "address",
      title: "Adresse de livraison",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phone",
      title: "Numéro de téléphone",
      type: "string",
    },
  ],
});
