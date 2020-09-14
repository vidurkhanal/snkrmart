import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { ProvideAuth } from "../utils/useAuth";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ProvideAuth>
        <Head>
          <title>SnkrMart</title>
        </Head>
        <Component {...pageProps} />
      </ProvideAuth>
    </AnimatePresence>
  );
}

export default MyApp;
