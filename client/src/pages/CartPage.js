import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const totalPrice = () => {
    try {
      let total = cart?.reduce((sum, item) => sum + item.price, 0);
      return total.toFixed(2);
    } catch (error) {
      console.error("Error calculating total price:", error);
      return "0.00"; // Default to zero if there's an error
    }
  };

  //delete ite
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  useEffect(() => {
    console.log("Client Token:", clientToken);
    if (clientToken) {
      setTimeout(() => {
        console.log("Attempting to mount DropIn...");
      }, 1000);
    }
  }, [clientToken]);

  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);

      if (!instance) {
        console.error("Braintree instance not loaded yet.");
        alert(
          "Payment system is not ready. Please wait a moment and try again."
        );
        setLoading(false);
        return;
      }

      const { nonce } = await instance.requestPaymentMethod();
      console.log("Payment nonce received:", nonce);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment completed successsfully");
    } catch (error) {
      console.error("Payment Error:", error);

      setLoading(false);
    }
  };

  // Ensure the button is disabled until instance is ready
  <button
    className="btn btn-primary"
    onClick={handlePayment}
    disabled={!instance || loading}
  >
    {loading ? "Processing..." : "Make Payment"}
  </button>;

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center ">
              {cart?.length > 0
                ? `You have  ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <p>Name: {p.name}</p>
                  <p>Description: {p.description.substring(0, 30)}</p>
                  <p>Price: {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total| CheckOut| Payment</p>
            <hr />
            <h4> Total:{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  ></button>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => {
                      console.log("Braintree instance initialized:", instance);
                      setInstance(instance);
                    }}
                  />

                  <button className="btn btn-primary" onClick={handlePayment}>
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
