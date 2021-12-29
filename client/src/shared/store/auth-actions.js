import axios from "axios";
import { uiSliceActions } from "./ui-slice";
import { authSliceActions } from "./auth-slice";

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
        await axios({
          method: "post",
          url: "/api/v1/users/signup",
          data: data,
        });
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
      setTimeout(() => {
        dispatch(uiSliceActions.hideNotification());
        window.location.replace("/auth");
      }, 3000);
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

export const loginAction = (data) => {
  let timer;
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
        await axios({
          method: "post",
          url: "/api/v1/users/login",
          data: data,
        });
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
          message: "Login successfully!",
        })
      );
      clearTimeout(timer);
      window.location.replace("/");
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }

    timer = setTimeout(() => {
      dispatch(uiSliceActions.hideNotification());
    }, 5000);
  };
};

export const isLoggedInAction = () => {
  let timer;
  return async (dispatch) => {
    const getData = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "/api/v1/users/isLoggedIn",
        });

        return res;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    };

    try {
      console.log("isLogged");
      const res = await getData();
      const user = res.data.data;

      dispatch(
        authSliceActions.isLoggedIn({
          name: user.name,
          email: user.email,
          photo: user.photo,
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

      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      dispatch(uiSliceActions.hideNotification());
    }, 5000);
  };
};

export const logoutAction = () => {
  let timer;
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Loading...",
        message: "Sending data!",
      })
    );

    const getData = async () => {
      try {
        dispatch(
          uiSliceActions.showNotification({
            status: "success",
            title: "Success",
            message: "Logout successfully!",
          })
        );

        await axios({
          method: "get",
          url: "/api/v1/users/logout",
        });

        clearTimeout(timer);
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    };

    try {
      await getData();

      window.location.reload();
    } catch (error) {
      console.log(error.message);
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }

    timer = setTimeout(() => {
      dispatch(uiSliceActions.hideNotification());
    }, 5000);
  };
};
