import styles from "../styles/components/Car.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

interface Page {
  label: string;
  src: string;
  value: string;
}

interface CarProps {
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

interface CarComponentProps {
  carData: CarProps;
}

const Car: React.FC<CarComponentProps> = ({ carData }) => {
  const pages: Page[] = [
    { label: 'Year', src: '/car/clock.png', value: String(carData.year) },
    { label: 'Horsepower', src: '/car/engine.png', value: `${carData.hp} Hp` },
    { label: 'Weight', src: '/car/weight.png', value: `${carData.weight} Kg` },
    { label: 'Seats', src: '/car/car-seat.png', value: String(carData.seats) },
    { label: 'Engine type', src: '/car/piston.png', value: carData.engine_type },
    { label: 'Fuel type', src: '/car/fuel.png', value: carData.fuel_type }
  ];

  return (
    <div className={styles.car}>
      <Image alt={carData.model} src={carData.image} width={200} height={120} />
      <header>
        <span>
          {carData.make} {carData.model}
        </span>
      </header>
      <div>
        <ul>
          {pages.slice(0, 3).map((page, index) => (
            <li key={index} aria-label="multi">
              <Image alt={page.label} src={page.src} width={20} height={20} />
              {page.value}
            </li>
          ))}
        </ul>
        <ul>
          {pages.slice(3, 6).map((page, index) => (
            <li key={index} aria-label="multi">
              <Image alt={page.label} src={page.src} width={20} height={20} />
              {page.value}
            </li>
          ))}
        </ul>
      </div>
      <button>{"Look around"}</button>
    </div>
  );
};

export default Car;
