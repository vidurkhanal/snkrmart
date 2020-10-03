import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../Components/Loading";
import Navbar from "../Components/Navbar";
import styles from "../styles/myaccount.module.css";
import { useRequireAuth } from "../utils/use-require-auth";
import { CircularProgress } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Cookies from "js-cookie";


export default function myaccount() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const auth = useRequireAuth();
  const { user } = auth;
  const router = useRouter();

  const signOut = () => {
    setLoading(true);
    setLoadingMessage("Safely Logging You Out...");
    auth.signout();
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <>
      {loading ? (
        <Loading message={loadingMessage} />
      ) : (
        <div className={styles.myaccount}>
          <Navbar
            disabledLink={auth ? true : false}
            noLinks
            setLoading={setLoading}
            setLoadingMessage={setLoadingMessage}
          />
          <main>
            <div className={styles.avatar}>
              {user ? (
                <div>
                  <img src={user.photoURL} alt="Avatar" />
                  <h1>Hello, {user.displayName} !!</h1>
                </div>
              ) : (
                <div>
                  <img src="/loading.gif" alt="Avatar" />
                </div>
              )}
            </div>
            <div className={styles.info}>
              {!user ? (
                <div className={styles.loadingInfo}>
                  <div>
                    <CircularProgress />
                    Loading Your Infos
                  </div>
                </div>
              ) : (
                <div className={styles.accountInfo}>
                  <h1>Account Overview</h1>
                  <p>
                    <span className={styles.category}>Full Name</span>{" "}
                    <span>{user.displayName}</span>
                  </p>
                  <p>
                    <span className={styles.category}>Email</span>{" "}
                    <span>{user.email}</span>
                  </p>
                  <p>
                    <span className={styles.category}>Verified Email</span>{" "}
                    <span>
                      {user.emailVerified ? (
                        <CheckCircleIcon color="inherit" />
                      ) : (
                        <CancelIcon color="error" />
                      )}
                    </span>
                  </p>
                  <p>
                    <span className={styles.category}>User Id</span>{" "}
                    <span>{user.uid}</span>
                  </p>
                  <p>
                    <span className={styles.category}>Phone Number </span>{" "}
                    <span>{`${user.phoneNumber}`}</span>
                  </p>
                  <p>
                    <span className={styles.category}>Member Since </span>
                    <span>{`${user.metadata.creationTime.slice(4, 16)}`}</span>
                  </p>
                  <button onClick={signOut}>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
  
}
