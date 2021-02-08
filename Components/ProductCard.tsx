import styles from "./productcard.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function ProductCard({ sneaker, setHomeLoading }) {
  const router = useRouter();
  return (
    <motion.div
      className={styles.productCard}
      whileHover={{
        scale: 1.02,
        boxShadow: "5px 5px 20px 1px rgba(0, 0, 0, 0.75)",
      }}
      onClick={() => {
        setHomeLoading(true);
        router.push("/product/[id]", `/product/${sneaker.slug}`);
      }}
    >
      <img
        src={sneaker?.grid_picture_url}
        alt={sneaker?.name}
        className={styles.thumbnail}
      />
      <div className={styles.bottom}>
        <hr />
        <h3>
          <span>
            {sneaker?.silhouette} {sneaker?.nickname}
          </span>{" "}
          <span>{sneaker?.retail_price_cents / 100}$</span>
        </h3>

        {sneaker?.has_stock ? (
          <p className={styles.inStock}>In Stock</p>
        ) : (
          <p className={styles.outOfStock}>Out Of Stock</p>
        )}
      </div>
    </motion.div>
  );
}
