import { useEffect, useRef, useState } from "react";
import styles from "./checkout.module.css";
import { nanoid } from "nanoid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {useRouter} from "next/router";

export default function CheckOutForm({ product,setLoading,setLoadingMessage }) {
  const paypalRef = useRef();
  const [orderid, setOrderId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter()
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                reference_id: product?.id,
                description: product?.name,
                amount: {
                  currency_code: "USD",
                  value: product?.retail_price_cents / 100,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order) {
            setIsSuccess(true);
            setOrderId(order.id);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypalRef.current);
  }, [product]);

  const backToHome = ()=>{
    setLoadingMessage("Bouncing Back To Home")
    setLoading(true)
    router.push('/')
  }

  return (
    <div className={styles.chekoutForm}>
      {isSuccess ? (
        <div className={styles.successfulPay}>
          <CheckCircleIcon color="inherit" className={styles.tickIcon} />
          <h1>Payment Successful</h1>
          <h3>Your Order {orderid} has been received.</h3>
          
            <p className={styles.homeLink} onClick={backToHome}>Back To Home</p>
         
        </div>
      ) : (
        <main>
          <h1> SnkrMart Billing Centre </h1>
          <div className={styles.checkoutProduct}>
              <img src={product?.grid_picture_url} alt={product?.nickname} />
            <div>
              <h2>
                  <span>Product Name </span> {product?.name}
              </h2>
              <h2>
                <span>Bill Number </span> {nanoid()}{" "}
              </h2>
              <h2 style={{ marginBottom: "20px" }}>
                <span>Total Bill</span>{" "}
                {parseFloat(product?.retail_price_cents / 100)} USD{" "}
              </h2>
              <span className={styles.tos}>
                All The Payments Of SnkrMart are handled via Paypal so in case
                of any payment error ,please contact Paypal Support.
              </span>
            </div>
          </div>
          <div ref={paypalRef}></div>
        </main>
      )}
    </div>
  );
}
