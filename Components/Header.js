import styles from "./header.module.css";
import { useRouter } from "next/router";

export default function Header({ setLoading, setLoadingMessage }) {
  const router = useRouter();
  setLoadingMessage("Loading .Please Be Patient. ");
  return (
    <>
      <h1>Select By Brands</h1>
      <div className={styles.header}>
        {/* Nike */}
        <div
          className={styles.headerIcon}
          onClick={() => {
            setLoading(true);
            router.push("/brands/[id]", "/brands/Nike");
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          <img src="/brands/nike.png" alt="Nike Logo" />
        </div>
        {/* Air Jordan */}
        <div
          className={styles.headerIcon}
          onClick={() => {
            setLoading(true);
            router.push("/brands/[id]", "/brands/AirJordan");
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          <img
            src="/brands/jordan.png"
            alt="Air Jordan Logo"
          />
        </div>
        {/* Adidas */}
        <div
          className={styles.headerIcon}
          onClick={() => {
            setLoading(true);
            router.push("/brands/[id]", "/brands/adidas");
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          <img
            src="/brands/adidas.png"
            alt="Adidas Logo"
          />
        </div>
        {/* Champion */}
        <div
          className={styles.headerIcon}
          onClick={() => {
            setLoading(true);
            router.push("/brands/[id]", "/brands/Champion");
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          <img
            src="/brands/champions.png"
            alt="Champions Logo"
          />
        </div>
        {/* Converse */}
        <div
          className={styles.headerIcon}
          onClick={() => {
            setLoading(true);
            router.push("/brands/[id]", "/brands/Converse");
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          <img
            src="/brands/converse.png"
            alt="Converse Logo"
          />
        </div>

        {/* Gucci */}
        <div
          className={styles.headerIcon}
          onClick={() => {
            setLoading(true);
            router.push("/brands/[id]", "/brands/Gucci");
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          <img
            src="/brands/gucci.png"
            alt="Gucci Logo"
          />
        </div>
        {/* Vans */}
        <div
          className={styles.headerIcon}
          onClick={() => {
            setLoading(true);
            router.push("/brands/[id]", "/brands/Vans");
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          <img
            src="/brands/vans.png"
            alt="Vans Logo"
            className={styles.last}
          />
        </div>
      </div>
    </>
  );
}
