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
          <script src="https://www.paypal.com/sdk/js?client-id=Ad87hlUqWRtHvELvpvMxBPFQrhqV_Uw9jmiqHoOvzPNenlDqJX1W2Y5B0fbSE5dt8jvb_PDoaw8M3syu&currency=USD"></script>
        </Head>
        <Component {...pageProps} />
      </ProvideAuth>
    </AnimatePresence>
  );
}

export default MyApp;
