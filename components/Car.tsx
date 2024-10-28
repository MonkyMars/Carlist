import styles from "../styles/components/Car.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

interface pages {
  label: string;
  src: string;
  value: string;
}

const Car = ({ carData }) => {

  const pages: pages[] = [
    { label: 'Year', src: '/car/clock.png', value: String(carData.year)},
    { label: 'Horsepower', src: '/car/engine.png', value: String(carData.hp) + ' Hp' },
    { label: 'Weight', src: '/car/weight.png', value: String(carData.weight) + ' Kg'},
    { label: 'Seats', src: '/car/car-seat.png', value: String(carData.seats)},
    { label: 'Engine type', src: '/car/piston.png', value: String(carData.engine_type)},
    { label: 'Fuel type', src: '/car/fuel.png', value: carData.fuel_type}
  ]
  return (
    <div className={styles.car}>
      <Image alt={carData.model} src={carData.image} width={200} height={120} />
      <header>
        <span>
          {carData.make} {carData.model}
        </span>
      </header>
      <div>
        {/*add object for items and map [0, 2] and [3, 5]  */}
        <ul>
      {pages.slice(0, 3).map((page: any, index: number) => (
        <div aria-label="multi" key={index}>
          <Image alt={page.label} src={page.src} width={20} height={20} />
          <li>{page.value}</li>
        </div>
      ))}
    </ul>
        <ul>
          {pages.slice(3, 6).map((page: any, index: number) => (
            <div aria-label="multi" key={index}>
            <Image alt={page.label} src={page.src} width={20} height={20} />
            <li>{page.value}</li>
          </div>
          ))}
        </ul>
      </div>
      <button>{"Look around"}</button>
    </div>
  );
};

export default Car;
