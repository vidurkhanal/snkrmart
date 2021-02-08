import { useState, useEffect } from "react";
import { useRequireAuth } from "../utils/use-require-auth";
import { db } from "../utils/useAuth";
import styles from "../styles/receipt.module.css";
import Loading from "../Components/Loading";
import Navbar from "../Components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Receipts() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const auth = useRequireAuth();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("receipts")
      .where("uid", "==", `${auth?.user?.uid}`)
      .onSnapshot((snapshot) =>
        setReceipts(
          snapshot.docs.map((doc) => ({
            receiptId: doc.id,
            ...doc.data(),
          }))
        )
      );
    return () => {
      unsubscribe();
    };
  }, [auth]);
  console.log(receipts);

  if (loading) {
    return <Loading message={loadingMessage} />;
  }

  if (receipts) {
    return (
      <div className={styles.receipts}>
        <Navbar
          disabledLink={auth ? true : false}
          noLinks
          setLoading={setLoading}
          setLoadingMessage={setLoadingMessage}
        />
        <div className={styles.content}>
          <h1>Receipts</h1>
          {receipts.length ? (
            <ul>
              <li className={styles.titles}>
                <span>Date</span>
                <span>Reference Id</span>
                <span>Price</span>
              </li>
              {receipts.map((receipt) => (
                <li className={styles.receipt} key={receipt.id}>
                  <span>{new Date(receipt.update_time).toDateString()}</span>
                  <span>{receipt.receiptId}</span>
                  <span>{receipt.purchase_units[0].amount.value}$</span>
                  <p
                    onClick={() => {
                      handleOpen();
                      setSelectedData(receipt);
                    }}
                  >
                    View
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyReceipt}>
              You Haven't Bought Anything Yet.
            </div>
          )}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">{selectedData?.id}</h2>
              <p id="transition-modal-description">
                <p>Payment Status:{selectedData?.status}</p>
                <p>
                  Shipping Name :
                  {selectedData?.purchase_units[0].shipping.name.full_name}
                </p>
                <p>
                  Shipping Address :
                  {
                    selectedData?.purchase_units[0].shipping.address
                      .address_line_1
                  }
                </p>
              </p>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
