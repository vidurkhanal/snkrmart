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
          <img
            src="https://i.pinimg.com/originals/20/60/2d/20602d43cc993811e5a6bd1886af4f33.png"
            alt="Nike Logo"
          />
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
            src="https://seeklogo.com/images/A/air-jordan-logo-66B3A1FAAF-seeklogo.com.png"
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
            src="https://www.freepngimg.com/thumb/adidas/58143-stan-logo-smith-shoe-adidas-free-frame.png"
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
            src="https://logos-download.com/wp-content/uploads/2018/05/Champion_logo_black.png"
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
            src="https://cdn.freebiesupply.com/logos/large/2x/converse-4610-logo-png-transparent.png"
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
            src="https://pngimg.com/uploads/gucci/gucci_PNG4.png"
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
            src="https://www.freepnglogos.com/uploads/vans-logo-png/vans-of-the-wall-logo-png-car-symbol-5.png"
            alt="Vans Logo"
          />
        </div>
      </div>
    </>
  );
}
