import React, { useState } from "react";
import Image from "next/image";
import Nav from "../components/Nav";
import styles from "../styles/Carfinder.module.scss";

// Types
interface CarResult {
  make: string;
  model: string;
  year: number;
  fuel_type: string;
  transmission: string;
  drive: string;
  displacement: string;
  class: string;
  imageUrl: string;
}

interface SearchFormProps {
  value: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (value: string) => void;
}

interface ResultsViewProps {
  results: CarResult[];
  onBackToSearch: () => void;
}

// Components
const SearchForm: React.FC<SearchFormProps> = ({ value, onSubmit, onChange }) => (
  <>
    <header>
      <h1>CarFinder</h1>
      <span>Your Guide to Car Specs and Features</span>
    </header>
    <form className={styles.inputs} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter make and model (e.g., Toyota Camry)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Car search input"
      />
      <button type="submit" aria-label="Search">
        <Image src="/icons/search.png" alt="search" width={24} height={24} />
      </button>
    </form>
    <span>Provided by CarList</span>
  </>
);

const ResultsView: React.FC<ResultsViewProps> = ({ results, onBackToSearch }) => (
  <>
    <div className={styles.resultsHeader}>
      <h2>{results.length} Results found</h2>
      <button
        onClick={onBackToSearch}
        className={styles.backButton}
        aria-label="Back to search"
      >
        Search again
      </button>
    </div>
    <div className={styles.carResult}>
      {results.map((result, index) => (
        <CarCard key={`${result.make}-${result.model}-${index}`} car={result} />
      ))}
    </div>
  </>
);

const CarCard: React.FC<{ car: CarResult }> = ({ car }) => (
  <div className={styles.carItem}>
    <header>
      <h3>
        {capitalize(car.make)} {capitalize(car.model)}
      </h3>
      <p>{capitalize(car.class)}</p>
      <div className={styles.imageContainer}>
        <Image
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          width={200}
          height={150}
          className={styles.carImage}
        />
      </div>
    </header>
    <main>
      <ul>
        <li>Year: {car.year}</li>
        <li>Fuel type: {capitalize(car.fuel_type)}</li>
        <li>Transmission: {car.transmission === "m" ? "Manual" : "Automatic"}</li>
        <li>Drive terrain: {car.drive.toUpperCase()}</li>
        <li>Displacement: {car.displacement}</li>
      </ul>
    </main>
  </div>
);

// Utilities
const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const fetchImage = async (make: string, model: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        `${make} ${model} car`
      )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const imageData = await response.json();
    return imageData.results[0]?.urls?.small || "/rs5.png";
  } catch (error) {
    console.error("Error fetching image:", error);
    return "/rs5.png";
  }
};

// Main Component
const CarFinder: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState<"search" | "result">("search");
  const [results, setResults] = useState<CarResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const [make, model] = searchValue.split(" ");

    if (!make || !model) {
      setError("Please enter both make and model");
      setIsLoading(false);
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_NINJA_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not configured");
      }

      const response = await fetch(
        `https://api.api-ninjas.com/v1/cars?model=${encodeURIComponent(
          model
        )}&make=${encodeURIComponent(make)}`,
        {
          headers: { "X-Api-Key": apiKey },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch results: ${response.statusText}`);
      }

      const data = await response.json();

      const resultsWithImages = await Promise.all(
        data.map(async (car: CarResult) => ({
          ...car,
          imageUrl: await fetchImage(car.make, car.model),
        }))
      );

      setResults(resultsWithImages);
      setPage("result");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}
        {isLoading ? (
          <div className={styles.loading}>Searching for cars...</div>
        ) : page === "search" ? (
          <SearchForm
            value={searchValue}
            onSubmit={handleSearch}
            onChange={setSearchValue}
          />
        ) : (
          <ResultsView
            results={results}
            onBackToSearch={() => setPage("search")}
          />
        )}
      </main>
    </>
  );
};

export default CarFinder;