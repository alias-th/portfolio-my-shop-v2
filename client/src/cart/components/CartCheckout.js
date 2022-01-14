import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// import classes from "./CartCheckout.module.css";

function CartCheckout() {
  const paypalRef = useRef();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const getItem = useCallback((cart) => {
    const items = [];
    cart.items.forEach((item) => {
      items.push({
        name: item.name,
        unit_amount: { value: item.price.toString(), currency_code: "THB" },
        quantity: item.quantity.toString(),
      });
    });
    return items;
  }, []);

  const getAmount = useCallback((cart) => {
    const amount = {
      currency_code: "THB",
      value: `${cart.totalAmount}`,
      breakdown: {
        item_total: {
          currency_code: "THB",
          value: `${cart.totalAmount}`,
        },
      },
    };

    return amount;
  }, []);

  const getFormData = useCallback(
    (cart, details) => {
      const formData = [];
      cart.items.forEach((item) => {
        formData.push({
          product: item.productId,
          user: user.id,
          seller: item.sellerId,
          transaction: details.id,
          name: item.name,
          price: item.price,
          imageCover: item.imageCover,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        });
      });

      return formData;
    },
    [user.id]
  );

  useEffect(() => {
    const items = getItem(cart);
    const amount = getAmount(cart);

    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: amount,
                items: items,
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            // console.log(data);

            const formData = getFormData(cart, details);

            axios({
              method: "post",
              url: "/api/v1/orders/",
              data: formData,
            })
              .then((res) => {
                localStorage.removeItem("cart");
              })
              .catch((err) => {
                console.log(err);
              });

            alert("Transaction completed by " + details.payer.name.given_name);
            window.location.replace("/");
          });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypalRef.current);
  }, [cart, getItem, getAmount, getFormData]);

  return <div ref={paypalRef}></div>;
}

export default CartCheckout;

// sandbox
// sb-rnu43w11346167@personal.example.com
// 2QXrm-,x
