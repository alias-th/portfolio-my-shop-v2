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
      await axios({
        method: "post",
        url: "/api/v1/users/signup",
        data: data,
      })
        .then((res) => {
          setTimeout(() => {
            window.location.replace("/auth");
          }, 3000);
        })
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
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
    }, 5000);
  };
};

export const loginAction = (data) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Loading...",
        message: "Sending data!",
      })
    );

    const postData = async () => {
      await axios({
        method: "post",
        url: "/api/v1/users/login",
        data: data,
      })
        .then((res) => {
          setTimeout(() => {
            window.location.replace("/");
          }, 3000);
        })
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
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
    }, 5000);
  };
};

export const isLoggedInAction = () => {
  return async (dispatch) => {
    const getData = async () => {
      await axios({
        method: "get",
        url: "/api/v1/users/isLoggedIn",
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
    };

    try {
      const res = await getData();
      const user = res.data.data;

      dispatch(
        authSliceActions.isLoggedIn({
          name: user.name,
          email: user.email,
          photo: user.photo,
          active: user.active,
        })
      );
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
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

export const resetPasswordAction = (data) => {
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
          url: "/api/v1/users/forgotPassword",
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
          message: "Send token for reset password successfully!",
        })
      );
      clearTimeout(timer);
      window.location.replace("/auth");
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

export const changePasswordWithTokenAction = (data, token) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Loading...",
        message: "Sending data!",
      })
    );

    const postData = async () => {
      await axios({
        method: "patch",
        url: `/api/v1/users/resetPassword/${token}`,
        data: data,
      })
        .then((res) => {
          setTimeout(() => {
            window.location.replace("/auth");
          }, 3000);
        })
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
    };

    try {
      await postData();
      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success",
          message: "change your password successfully!",
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
    }, 5000);
  };
};
