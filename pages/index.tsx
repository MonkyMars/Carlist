"use client"
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Nav from "../components/Nav";
import Car from "../components/Car";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AOS from "aos"
import "aos/dist/aos.css"
const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      offset: 0, 
      duration: 700, 
      easing: 'ease-in-out',
    });
  }, []);
  return (
    <>
    <Head>
      <title>{'CarList'}</title>
    </Head>
      <h2 className={styles.title} data-aos="fade">{"CarList"}</h2>
      <main className={styles.main} data-aos="fade-down">
        <section>
          <h2>{"CarList"}</h2>
          <Image
            src={"/rs5.png"}
            alt="Audi RS5"
            width={2000}
            height={2000}
            draggable={false}
          />
          <div />
          <label>{"Audi RS5 B9"}</label>
        </section>
      </main>
      <div className={styles.button_container} data-aos="flip-left">
        <button onClick={() => router.push("/carfinder")}>
          {"Car Finders"}
        </button>
        <button onClick={() => router.push("/collection/showcase")}>
          {"Browse Collection"}
        </button>
        <button onClick={() => router.push("/insights")}>
          {"Discover Insights"}
        </button>
      </div>
      <main className={styles.articles}>
        <article data-aos="fade">
          <Image src={"/gt3.avif"} alt="gt3" width={2000} height={2000} />
          <div>
            <h3>{"Porsche 922 GT3 Touring"}</h3>
            <p>
              {
                "The Porsche 911 GT3 Touring 992 masterfully combines performance and elegance, delivering an exhilarating driving experience. With its subtle design—eschewing the aggressive wing for a refined look—it’s equally at home on the track and the road. Powered by a thrilling 4.0-liter flat-six engine with 502 horsepower, it accelerates from 0 to 60 mph in just 3.2 seconds, accompanied by a spine-tingling exhaust note."
              }
            </p>
            <p>
              {"The handling is precise, thanks to active suspension and rear-axle steering, while the luxurious interior offers comfort for everyday driving. The GT3 Touring perfectly embodies Porsche&apos;s racing heritage, making it an ideal choice for enthusiasts who seek both performance and practicality. But how does it stack up against its rivals? Read further in our" } 
              <Link href={'/insights/porsche/gt3-touring-992'}>{' insights!'}</Link>
            </p>
          </div>
        </article>
        <article data-aos="fade">
          <Image src={"/rs5.png"} alt="gt3" width={2000} height={2000} draggable={false} />
          <div>
            <h3>{"Up and coming"}</h3>
            <p>
              {
                "The Audi RS5 B9 is set to be a thrilling addition to the realm of performance coupes, seamlessly blending power and sophistication for an unparalleled driving experience. With its dynamic design—characterized by a bold Singleframe grille and sculpted lines—it commands attention on both the road and the racetrack. Under the hood, it boasts a potent twin-turbocharged 2.9-liter V6 engine, delivering a remarkable 444 horsepower, enabling it to sprint from 0 to 60 mph in a mere 3.9 seconds, all while emitting an exhilarating soundtrack."
              }
            </p>
            <p>
              {"Equipped with Audi's renowned Quattro all-wheel drive system, the RS5 B9 offers exceptional grip and stability, ensuring confident handling in all conditions. Inside, the cabin is a sanctuary of luxury, featuring premium materials, state-of-the-art technology, and ergonomically designed sports seats that provide both comfort and support. The RS5 B9 encapsulates Audi's performance pedigree, making it an enticing option for enthusiasts who crave both everyday usability and track-ready dynamics. But will it rise to the occasion against its fierce competitors? Discover more in our" }
              <Link href={'/insights/audi/rs5-b9-upandcoming'}>{' insights!'}</Link>
            </p>
          </div>
        </article>
      </main>
    </>
  );
};

export default Home;
