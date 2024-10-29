import React from "react";
import styles from '../styles/Manufacturers.module.scss'
import Image from "next/image";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
const Manufacturers = () => {
  const router = useRouter();
  const ManufacturersData = [
    "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", 
    "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dacia", "Daewoo", 
    "Daihatsu", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", 
    "Hummer", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Koenigsegg", 
    "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", 
    "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Pagani", 
    "Peugeot", "Porsche", "Ram", "Renault", "Rolls-Royce", "Saab", "Saturn", 
    "Scion", "Seat", "Skoda", "Smart", "Subaru", "Suzuki", "Tesla", "Toyota", 
    "Volkswagen", "Volvo"
  ];
  
  return(
    <>
    <Nav/>
    <main className={styles.main}>
      <h1>Manufacturers</h1>
      <div className={styles.container}>
        {ManufacturersData.map((make, index) => (
          <div key={index} onClick={() => router.push(`/manufacturers/${make.toLocaleLowerCase().replace(' ', '-').replace('ë', 'e')}`)}>
            <Image src={`https://www.carlogos.org/car-logos/${make.toLocaleLowerCase().replace(' ', '-')}-logo.png`} alt={make} width={50} height={50} draggable={false} priority/>
            <label>{make}</label>
          </div>
        ))}
      </div>
    </main>
    </>
  )
}

export default Manufacturers;