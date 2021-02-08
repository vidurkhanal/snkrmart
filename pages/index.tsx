import Head from "next/head";
import styles from "../styles/Home.module.css";
import ProductCard from "../Components/ProductCard";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Loading from "../Components/Loading";

export default function Home({ lifeStyle, men, youth, women }) {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  if (loading) {
    return <Loading message={loadingMessage} />;
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>SnkrMart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar
          setLoading={setLoading}
          setLoadingMessage={setLoadingMessage}
          disabledLink
        />

        <motion.main className={styles.main} exit={{ opacity: 0 }}>
          <img src="/banner.png" alt="banner" />
          <Header
            setLoading={setLoading}
            setLoadingMessage={setLoadingMessage}
          />
          <h1>LifeStyle Wears</h1>
          <div className={styles.catalog}>
            {lifeStyle.map((sneaker) => {
              return (
                <ProductCard
                  sneaker={sneaker}
                  key={sneaker.id}
                  setHomeLoading={setLoading}
                />
              );
            })}
          </div>
          <h1>Men</h1>
          <div className={styles.catalog}>
            {men.map((sneaker) => {
              return (
                <ProductCard
                  sneaker={sneaker}
                  key={sneaker.id}
                  setHomeLoading={setLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              );
            })}
          </div>
          <h1>Youth</h1>
          <div className={styles.catalog}>
            {youth.map((sneaker) => {
              return (
                <ProductCard
                  sneaker={sneaker}
                  key={sneaker.id}
                  setHomeLoading={setLoading}
                />
              );
            })}
          </div>
          <h1>Women</h1>
          <div className={styles.catalog}>
            {women.map((sneaker) => {
              return (
                <ProductCard
                  sneaker={sneaker}
                  key={sneaker.id}
                  setHomeLoading={setLoading}
                />
              );
            })}
          </div>
        </motion.main>
      </div>
    );
  }
}

export async function getStaticProps() {
  const res = await fetch(
    "https://raw.githubusercontent.com/vidurkhanal/SNKRMART_DUMMY_DATA/master/data.json"
  );
  const data = await res.json();
  const sneakers = data.sneakers;
  const lifeStyle = sneakers.filter(
    (sneaker) => sneaker.category == "lifestyle"
  );
  const men = sneakers.filter((sneaker) => sneaker.gender == "men");
  const youth = sneakers.filter((sneaker) => sneaker.gender == "youth");
  const women = sneakers.filter((sneaker) => sneaker.gender == "women");
  return { props: { lifeStyle, men, youth, women } };
}
