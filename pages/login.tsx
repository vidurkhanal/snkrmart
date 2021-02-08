import styles from "../styles/Login.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAuth } from "../utils/useAuth";
import { useState } from "react";
import Loading from "../Components/Loading";

export default function login() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const loggedIn = Cookies.get("isLoggedInToSnkrMart");
  const router = useRouter();
  const auth = useAuth();
  if (loggedIn) {
    const router = useRouter();
    router.push("/");
    return <h1>Already Logged In. Redirecting TO Home Page</h1>;
  } else {
    if (loading) {
      return <Loading message={loadingMessage} />;
    } else {
      return (
        <>
          <img
            src="/logo-colorful.png"
            alt="Brand Logo"
            className={styles.logo}
          />
          <div className={styles.login}>
            <button
              className={styles.googleLogin}
              onClick={() => {
                setLoading(true);
                setLoadingMessage("Hearing Back From Google...");
                auth.loginWithGoogle();
              }}
            >
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                alt="Google Logo"
              />
              <p>Sign In With Google</p>
            </button>

            <h5>Yes ,We Are Only Accepting Google Login For Now.</h5>
          </div>
        </>
      );
    }
  }
}
