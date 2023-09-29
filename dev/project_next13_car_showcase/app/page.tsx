"use client";
import { fetchCars } from "@utils";
import { fuels, yearsOfProduction } from "@constants";
import {
  CarCard,
  ShowMore,
  SearchBar,
  CustomFilter,
  Hero,
  NavBar,
} from "@components";
import { getProducts } from "@sanity/utils/produts";
import { useEffect } from "react";
import CardSection from "@components/CardSection";

export default async function Home() {
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || "",
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || "",
  // });s
  const produts = await getProducts();

  const isDataEmpty = !Array.isArray(produts) || produts.length < 1 || !produts;

  return (
    <main className="overflow-hidden">
      <NavBar />
      {/* <Hero /> */}

      <div className=" mt-32 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Catalogue de Pagnes</h1>
          <p>Explorez nos pagnes qui pourraient vous plaire</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            {/* <CustomFilter title="year" options={yearsOfProduction} /> */}
          </div>
        </div>

        {!isDataEmpty ? (
          <>
            <section className="mt-6">
              <CardSection />
            </section>
            <section className="mt-6 rounded-xl overflow-hidden">
              <CardSection />
            </section>
            <section className="mt-6 rounded-xl overflow-hidden">
              <CardSection />
            </section>
          </>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{produts?.length}</p>
          </div>
        )}
      </div>
    </main>
  );
}
