import Navbar from "../../Components/Navbar";
import styles from "../../styles/brand.module.css";
import Header from "../../Components/Header";
import ProductCard from "../../Components/ProductCard";
import { useState } from "react";
import Loading from "../../Components/Loading";

export default function Brand(sneaker, reqBrand) {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  if (loading) {
    return <Loading message={loadingMessage} />;
  } else {
    return (
      <div className={styles.brand}>
        <Navbar setLoading={setLoading} setLoadingMessage={setLoadingMessage} />
        <Header setLoading={setLoading} setLoadingMessage={setLoadingMessage} />
        <div className={styles.products}>
          {sneaker.sneaker.map((sn) => (
            <ProductCard
              sneaker={sn}
              key={sn.id}
              setHomeLoading={setLoading}
              setLoadingMessage={setLoadingMessage}
            />
          ))}
        </div>
      </div>
    );
  }
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        id: "Nike",
      },
    },
    {
      params: {
        id: "AirJordan",
      },
    },
    {
      params: {
        id: "adidas",
      },
    },
    {
      params: {
        id: "Champion",
      },
    },
    {
      params: {
        id: "Converse",
      },
    },
    {
      params: {
        id: "Gucci",
      },
    },
    {
      params: {
        id: "Vans",
      },
    },
  ];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let reqBrand = params.id == "AirJordan" ? "Air Jordan" : params.id;
  const res = await fetch(
    "https://raw.githubusercontent.com/vidurkhanal/SNKRMART_DUMMY_DATA/master/data.json"
  );
  const data = await res.json();
  const sneakers = data.sneakers;
  const sneaker = sneakers.filter((sneaker) => sneaker.brand_name === reqBrand);
  return {
    props: { sneaker, brand: reqBrand },
  };
}
