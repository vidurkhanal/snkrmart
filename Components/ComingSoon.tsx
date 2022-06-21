import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Loading from "./Loading";

export default function ComingSoon() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const router = useRouter();
  if (loading) {
    return <Loading message={loadingMessage} />;
  } else {
    return (
      <div className="coming-soon">
        <div
          onClick={() => {
            setLoading(true);
            setLoadingMessage("Bouncing Back ...");
            router.back();
          }}
          style={{ cursor: "pointer" }}
        >
          <motion.img
            src="https://img.icons8.com/plasticine/2x/back.png"
            alt="Go Back"
            style={{ height: 100 }}
            whileHover={{ scale: 1.2 }}
          />
        </div>
        <h1> Coming Soon....</h1>
      </div>
    );
  }
}
