import styles from "./navbar.module.css";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import LockIcon from "@material-ui/icons/Lock";
import { useRouter } from "next/router";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Cookies from "js-cookie";
import { useAuth } from "../utils/useAuth";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";

export default function Navbar({
  setLoading,
  setLoadingMessage,
  disabledLink,
}) {
  const loginStatus = Cookies.get("isLoggedInToSnkrMart");
  const [isDataRetrieved, setIsDataRetrieved] = useState();
  const auth = useAuth();
  const router = useRouter();
  return (
    <div className={styles.navbar}>
      <img
        src="/logo.png"
        alt="SnkrMart"
        className={styles.logo}
        onClick={() => {
          if (!disabledLink) {
            setLoading(true);
            setLoadingMessage("Going Back To Home ...");
            setTimeout(() => {
              router.push("/");
            }, 2000);
          }
        }}
        style={{ cursor: "pointer" }}
      />
      <div className={styles.right}>
        {!loginStatus ? (
          <div
            className={styles.rightItem}
            onClick={() => {
              setLoading(true);
              setLoadingMessage("Redirecting You To Log In page.");
              router.push("/login");
            }}
          >
            <LockIcon className={styles.rightItemIcon} />
            <p>Log In</p>
            <span> </span>
          </div>
        ) : auth.user ? (
          <>
            <div
              className={styles.rightItem}
              onClick={() => {
                setLoading(true);
                setLoadingMessage("Taking You To Your Account.");
                router.push("/myaccount");
              }}
            >
              <AccountCircleOutlinedIcon className={styles.rightItemIcon} />
              <p>My Account</p>
            </div>
            <div
              className={styles.rightItem}
              onClick={() => {
                setLoading(true);
                setLoadingMessage("Taking You To Receipts");
                router.push("/receipts");
              }}
            >
              <CreditCardIcon className={styles.rightItemIcon} />
              <p> Receipts</p>
            </div>
            <div
              className={styles.rightItem}
              onClick={() => {
                setLoading(true);
                setLoadingMessage(
                  "Logging Out. Please Be Patient For Few Seconds."
                );
                auth.signout();
                setTimeout(() => {
                  router.push("/login");
                }, 3000);
              }}
            >
              <ExitToAppIcon className={styles.rightItemIcon} />
              <p>Log Out</p>
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}
