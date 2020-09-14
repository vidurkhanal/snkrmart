import styles from "../../styles/individual.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../utils/useAuth";
import Loading from "../../Components/Loading";
import StripeCheckout from "react-stripe-checkout";

const removeTags = (str) => {
  str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
};

export default function IndividualPage({ sneaker, stripeKey }) {
  console.log(process.env.PUBLISHABLE_KEY);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const router = useRouter();
  const auth = useAuth();
  const handleToken = (token, PaymentAddress) => {
    console.log(token, PaymentAddress);
  };

  if (loading) {
    return <Loading message={loadingMessage} />;
  } else {
    return (
      <motion.div>
        <Head>
          <title>{sneaker[0]?.name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.picture}>
            <div
              onClick={() => {
                setLoading(true);
                setLoadingMessage("Bouncing Back ...");
                router.back();
              }}
              style={{ cursor: "pointer" }}
            >
              <motion.img
                src="https://bintangraya.com/assets/back/dist/css/ionicons/png/512/arrow-left-c.png"
                alt="Go Back"
                className={styles.logo}
                whileHover={{ scale: 1.2 }}
              />
            </div>

            <motion.img
              src={sneaker[0].main_picture_url}
              alt={sneaker[0]?.name}
              whileHover={{ scale: 1.2 }}
              className={styles.productImage}
            />
          </div>
          <div className={styles.product}>
            <div>
              <p className={styles.category}>{sneaker[0].category}</p>
              <h3>{sneaker[0]?.name}</h3>
              <p>
                {sneaker[0]?.story_html && removeTags(sneaker[0]?.story_html)}
              </p>
              <div className={styles.info}>
                <div className={styles.infoLeft}>
                  <p className={styles.designer}>
                    Designed By : {sneaker[0].designer}
                  </p>
                  <p className={styles.color}>
                    Color Profile : {sneaker[0].details}
                  </p>
                  <p className={styles.releaseDate}>
                    Released On: {sneaker[0].release_year}
                  </p>
                  <p className={styles.sku}>SKU: {sneaker[0].sku}</p>
                  <div className={styles.sizes}>
                    <p>
                      Sizes Available:
                      {sneaker[0].size_range.map((size) => (
                        <>{size} </>
                      ))}
                    </p>
                  </div>
                </div>

                <div className={styles.infoRight}>
                  <h3>{sneaker[0]?.retail_price_cents / 100}$</h3>
                </div>
              </div>
              {auth.user ? (
                <StripeCheckout
                  stripeKey={stripeKey}
                  token={handleToken}
                  name={sneaker[0].name}
                  amount={sneaker[0]?.retail_price_cents}
                  billingAddress
                  shippingAddress
                  zipCode
                  ComponentClass="div"
                  image={sneaker[0].main_picture_url}
                  currency="USD"
                >
                  <button className={styles.cta}>Buy Now.</button>
                </StripeCheckout>
              ) : (
                <button
                  className={styles.cta}
                  onClick={() => {
                    setLoading(true);
                    setLoadingMessage("Taking You To Login Page.");
                    router.push("/login");
                  }}
                >
                  Sign In To Buy ;)
                </button>
              )}
            </div>
          </div>
        </main>
      </motion.div>
    );
  }
}

export async function getStaticPaths() {
  const res = await fetch(
    "https://raw.githubusercontent.com/vidurkhanal/SNKRMART_DUMMY_DATA/master/data.json"
  );
  const data = await res.json();
  const sneakers = data.sneakers;
  const paths = sneakers.map((sneaker) => {
    return {
      params: {
        id: sneaker.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    "https://raw.githubusercontent.com/vidurkhanal/SNKRMART_DUMMY_DATA/master/data.json"
  );
  const data = await res.json();
  const sneakers = data.sneakers;
  const sneaker = sneakers.filter((sneaker) => sneaker.slug === params.id);
  const stripeKey = process.env.PUBLISHABLE_KEY;
  return {
    props: { sneaker, stripeKey },
  };
}
