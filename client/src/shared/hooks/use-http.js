import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../store/ui-slice";

function useHttp(
  requestFunction,
  notification,
  messageNotification,
  mustReload
) {
  const [data, setData] = useState();

  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async function (productId, requestData) {
      let timer;

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
        const responseData = await requestFunction(productId, requestData);

        setData(responseData);

        clearTimeout(timer);
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
        if (mustReload) {
          window.location.reload();
        }
        dispatch(uiSliceActions.hideNotification());
      }, 5000);
    },
    [requestFunction, dispatch, messageNotification, notification, mustReload]
  );

  return { sendRequest, data };
}

export default useHttp;
