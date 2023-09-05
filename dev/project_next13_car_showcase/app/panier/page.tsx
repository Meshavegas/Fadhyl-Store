"use client";
import { useProductContext } from "@context/productContext";
import React from "react";

export default function ProductContainer() {
  const { products } = useProductContext();
  console.log(products);

  return (
    <div className="flex justify-center align-bottom text-black flex-col pt-[140px] text-2xl">
      <div className="">1ProductContainer</div>
      <div className="">ProductContainer</div>
      <div className="">ProductContainer</div>
      <div className="">ProductContainer</div>
      <div className="">ProductContainer</div>
      <div className="">ProductContainer</div>
      <div className="">ProductContainer</div>
      <div className="">ProductContainer</div>
      <div className="">ProductContainer</div>
      {products.map((e, i) => (
        <div className="" key={i}>
          {e.name}
        </div>
      ))}
    </div>
  );
}
