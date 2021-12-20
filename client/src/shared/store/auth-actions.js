import axios from "axios";

import { uiSliceActions } from "./ui-slice";

export const signupAction = (data) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Loading...",
        message: "Sending data!",
      })
    );

    const postData = async () => {
      try {
        const res = await axios({
          method: "post",
          url: "/api/v1/users/signup",
          data: data,
        });
        console.log(res, "test");
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    };

    try {
      await postData();
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

    setTimeout(() => {
      dispatch(uiSliceActions.hideNotification());
    }, 10000);
  };
};
