import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("STEP 1: Creating payment intent");

      // 1️⃣ Create PaymentIntent
      const res = await axios.post(
        "http://127.0.0.1:8000/payments/create-payment-intent/",
        { amount }
      );

      const { client_secret } = res.data;
      console.log("Client secret received");

      // 2️⃣ Stripe confirmation
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error("Stripe error:", result.error);
        alert("Payment Failed: " + result.error.message);
        setLoading(false);
        return;
      }

      console.log("Stripe status:", result.paymentIntent.status);

      // 3️⃣ Stripe SUCCESS → backend DB update
      if (result.paymentIntent.status === "succeeded") {
        console.log("STEP 3: Confirming payment on backend");

        const token = localStorage.getItem("access_token");

        await axios.post(
          "http://127.0.0.1:8000/payments/purchase/",
          {
            payment_intent_id: result.paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Order created in DB");
        setPaymentSuccess(true);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #2f2f2f, #caa24d)",
          paddingTop: "120px",
          paddingBottom: "60px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {/* LEFT: ORDER SUMMARY */}
          <div
            style={{
              background: "#1f1f1f",
              color: "#fff",
              padding: "30px",
              borderRadius: "24px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            }}
          >
            <button
              onClick={() => navigate("/cart")}
              style={{
                background: "transparent",
                border: "none",
                color: "#f5c469",
                marginBottom: "20px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ← Back to Cart
            </button>

            <h2 style={{ marginBottom: "20px", color: "#f5c469" }}>
              Order Summary
            </h2>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Shipping</span>
              <span style={{ color: "#6ee7b7" }}>Free</span>
            </div>

            <hr style={{ borderColor: "#333", margin: "20px 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
              }}
            >
              <strong>Total Payable</strong>
              <strong style={{ color: "#f5c469" }}>₹{amount}</strong>
            </div>

            <p
              style={{
                marginTop: "25px",
                fontSize: "13px",
                color: "#aaa",
                lineHeight: "1.6",
              }}
            >
              🔒 Secure payment using Stripe <br />
              💳 Card details are never stored <br />
              🧪 Test Mode (No real money)
            </p>
          </div>

          {/* RIGHT: PAYMENT / SUCCESS */}
          <div
            style={{
              background: "#ffffff",
              padding: "35px",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            {!paymentSuccess ? (
              <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center", fontWeight: "800" }}>
                  Secure Payment
                </h2>

                <p
                  style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    color: "#666",
                  }}
                >
                  Pay <strong>₹{amount}</strong>
                </p>

                <div
                  style={{
                    padding: "16px",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    marginBottom: "25px",
                  }}
                >
                  <CardElement />
                </div>

                <button
                  type="submit"
                  disabled={!stripe || loading}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "#f5c469",
                    color: "#1f1f1f",
                    border: "none",
                    borderRadius: "14px",
                    fontSize: "16px",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  {loading ? "Processing..." : "Pay Now →"}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#16a34a" }}>✅ Payment Successful</h2>

                <p style={{ marginBottom: "30px", color: "#555" }}>
                  Your order has been placed successfully.
                </p>

                <button
                  onClick={() => navigate("/")}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "#333",
                    color: "#fff",
                    borderRadius: "12px",
                    marginBottom: "12px",
                    fontWeight: "700",
                  }}
                >
                  Continue Shopping
                </button>

                <button
                  onClick={() => navigate("/userprofile")}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "#f5c469",
                    color: "#1f1f1f",
                    borderRadius: "12px",
                    fontWeight: "700",
                  }}
                >
                  View Orders
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutForm;
