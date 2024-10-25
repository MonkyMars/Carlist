import styles from "../styles/components/Car.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

const Car = ({ carData }) => {
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
          <div aria-label="multi">
            <Image alt="" src={"/car/clock.png"} width={20} height={20} />
            <li>{carData.year}</li>
          </div>
          <div aria-label="multi">
            <Image alt="" src={"/car/engine.png"} width={20} height={20} />
            <li>{carData.hp} Hp</li>
          </div>
          <div aria-label="multi">
            <Image alt="" src={"/car/weight.png"} width={20} height={20} />
            <li>{carData.weight} Kg</li>
          </div>
        </ul>
        <ul>
          <div aria-label="multi">
            <Image alt="" src={"/car/car-seat.png"} width={20} height={20} />
            <li>{carData.seats}</li>
          </div>
          <div aria-label="multi">
            <Image alt="" src={"/car/piston.png"} width={20} height={20} />
            <li>{carData.engine_type}</li>
          </div>
          <div aria-label="multi">
            <Image alt="" src={"/car/fuel.png"} width={20} height={20} />
            <li>{carData.fuel_type}</li>
          </div>
        </ul>
      </div>
      <button>{"Look around"}</button>
    </div>
  );
};

export default Car;
