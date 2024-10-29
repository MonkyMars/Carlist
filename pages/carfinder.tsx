import React, { useState } from "react";
import styles from "../styles/Carfinder.module.scss";
import Nav from "../components/Nav";
import Image from "next/image";

const CarFinder = () => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState("search");
  const [results, setResults] = useState([]);

  const carSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const [make, model] = value.split(" ");
    await fetchResult(make, model);
    setPage("result");
  };

  const fetchResult = async (make: string, model: string) => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/cars?model=${encodeURIComponent(
          model
        )}&make=${encodeURIComponent(make)}`,
        {
          headers: { "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY },
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Fetch images for each car and add to the results
        const resultsWithImages = await Promise.all(
          data.map(async (car: any) => ({
            ...car,
            imageUrl: await fetchImage(car.make, car.model),
          }))
        );
        setResults(resultsWithImages);
      } else {
        console.log("Failed to fetch results");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchImage = async (make: string, model: string) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          make + " " + model
        )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
      );

      if (response.ok) {
        const imageData = await response.json();
        return imageData.results[0]?.urls?.small || "/rs5.png";
      } else {
        console.log("Failed to fetch image");
        return "/rs5.png";
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      return "/rs5.png";
    }
  };

  return (
    <>
      <Nav />
      <main className={styles.main}>
        {page === "search" && (
          <>
            <header>
              <h1>{"CarFinder"}</h1>
              <span>{"Your Guide to Car Specs and Features"}</span>
            </header>
            <form className={styles.inputs} onSubmit={carSearchSubmit}>
              <input
                type="text"
                placeholder="Corvette Zr6"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit">
                <Image
                  src={"/icons/search.png"}
                  alt="continue"
                  width={24}
                  height={24}
                />
              </button>
            </form>
            <span>{"Provided by CarList"}</span>
          </>
        )}
        {page === "result" && (
          <>
            <h2>{results.length} Results found:</h2>
            <label
              onClick={() => setPage("search")}
              style={{ cursor: "pointer" }}
            >
              {"Search again"}
            </label>
            <div className={styles.carResult}>
              {results.map((result: any, index: number) => (
                <div key={index} className={styles.carItem}>
                  <header>
                    <h3>
                      {result.make.charAt(0).toUpperCase() +
                        result.make.slice(1)}{" "}
                      {result.model.charAt(0).toUpperCase() +
                        result.model.slice(1)}
                    </h3>
                    <p>
                      {result.class.charAt(0).toUpperCase() +
                        result.class.slice(1)}
                    </p>
                    <Image
                      src={result.imageUrl}
                      alt={`${result.make} ${result.model}`}
                      width={200}
                      height={150}
                    />
                  </header>
                  <main>
                    <ul>
                      <li>Year: {result.year}</li>
                      <li>
                        Fuel type:{" "}
                        {result.fuel_type.charAt(0).toUpperCase() +
                          result.fuel_type.slice(1)}
                      </li>
                      <li>
                        Transmission:{" "}
                        {result.transmission === "m" ? "Manual" : "Automatic"}
                      </li>
                      <li>Drive terrain: {result.drive.toUpperCase()}</li>
                      <li>Displacement: {result.displacement}</li>
                    </ul>
                  </main>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default CarFinder;
