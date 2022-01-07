import { uiSliceActions } from "./ui-slice";
import { cartSliceActions } from "./cart-slice";
import axios from "axios";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      try {
        await axios({
          method: "POST",
          url: "/api/v1/carts/",
          data: cart,
        });
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sign up successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};

export const fetchCart = (userId) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/v1/carts/${userId}`,
        });

        return response;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    };

    try {
      const cartData = await sendRequest();
      dispatch(
        cartSliceActions.replaceCart({
          items: cartData || [],
          totalQuantity: cartData || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};
