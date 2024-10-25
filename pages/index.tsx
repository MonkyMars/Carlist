import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Nav from "../components/Nav";
import Car from "../components/Car";
import React, { useEffect, useState } from "react";

interface Car {
  make: string;
  model: string;
  fuel_type: string;
  year: number;
  hp: number;
  seats: number;
  weight: number;
  engine_type: string;
  image: string;
}

const Home: NextPage = () => {
  const [carData, setCarData] = useState<Car[]>([
    {
      make: "Toyota",
      model: "Camry",
      fuel_type: "Gasoline",
      year: 2022,
      hp: 203,
      seats: 5,
      weight: 3340,
      engine_type: "V8",
      image: "/icons/search.png",
    },
  ]);

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <header>
          <h1>{"Carlist"}</h1>
          <p>{"Find all the specifications you need."}</p>
          <button>{"Search"}</button>
        </header>
        <section aria-label="most popular">
          <h2>{"Most Popular"}</h2>
          <div>
            <button aria-label="<">{"<"}</button>
            <div>
              <Car carData={carData[0]} />
              <Car carData={carData[0]} />
              <Car carData={carData[0]} />
            </div>
            <button aria-label=">">{">"}</button>
          </div>
        </section>
        <section>
          <h2>{'Newest additions'}</h2>
          <div>
            <button aria-label="<">{"<"}</button>
            <div>
              <Car carData={carData[0]} />
              <Car carData={carData[0]} />
              <Car carData={carData[0]} />
            </div>
            <button aria-label=">">{">"}</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
