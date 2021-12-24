import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../store/ui-slice";

function useHttp(requestFunction, notification, messageNotification) {
  const [data, setData] = useState();

  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async function (requestData) {
      notification &&
        dispatch(
          uiSliceActions.showNotification({
            status: "pending",
            title: "Loading...",
            message: "Sending data!",
          })
        );

      try {
        notification &&
          dispatch(
            uiSliceActions.showNotification({
              status: "success",
              title: "Success",
              message: messageNotification,
            })
          );
        const responseData = await requestFunction(requestData);
        setData(responseData);
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
    },
    [requestFunction, dispatch, messageNotification, notification]
  );

  return { sendRequest, data };
}

export default useHttp;
