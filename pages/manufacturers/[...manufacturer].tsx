import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from '../../styles/Manufacturers.module.scss'
import Nav from "../../components/Nav";

interface CarModel {
  id: number;
  make_id: number;
  name: string;
}


const ManufacturerPage = () => {
  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const manufacturerData = router.query.manufacturer;
  const manufacturer = manufacturerData
    ? String(manufacturerData[0])
        .charAt(0)
        .toUpperCase() + String(manufacturerData[0]).slice(1).replace("-", " ")
    : "";

  useEffect(() => {
    if (manufacturerData) {
      setLoading(true);
      setError("");
      const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
      if (!apiKey) {
        console.error("API key is not defined!");
        setError("API key is not defined!");
        setLoading(false);
        return;
      }

      fetch(
        `https://car-api2.p.rapidapi.com/api/models?make=${manufacturerData}&year=2020`,
        {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
          } as HeadersInit,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.data)
          setModels(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
          setError("Failed to fetch models. Please try again later.");
          setLoading(false);
        });
    }
  }, [manufacturerData]);

  return (
    <>
    <Nav/>
    <div className={styles.main}>
      <h1>{manufacturer}</h1>
      <p>Details and specifications for {manufacturer}</p>

      {loading && <p>Loading models...</p>}
      {error && <p>Error: {error}</p>}

      {models ? (
        <div className={styles.container}>
          {models.map((model, index) => (
            <div key={index} className={styles.model}>
              <Image src={'/rs5.png'} alt={''} width={100} height={100} draggable={false} priority/>
              <label>{model.name}</label>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No models available.</p>
      )}
    </div></>
  );
};

export default ManufacturerPage;
