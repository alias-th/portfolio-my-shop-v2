import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../store/ui-slice";

function useHttp(requestFunction) {
  const [data, setData] = useState();

  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async function (requestData) {
      try {
        console.log("send req");
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

        setTimeout(() => {
          dispatch(uiSliceActions.hideNotification());
        }, 5000);
      }
    },
    [requestFunction, dispatch]
  );

  return { sendRequest, data };
}

export default useHttp;
