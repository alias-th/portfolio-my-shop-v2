import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, actions) => {
  if (actions.type === "INPUT") {
    return {
      value: actions.value,
      isTouched: state.isTouched,
    };
  }

  if (actions.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }

  if (actions.type === "RESET") {
    return { isTouched: false, value: "" };
  }

  if (actions.type === "PHOTO") {
    return {
      value: actions.value,
      isTouched: state.isTouched,
    };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [state, dispatch] = useReducer(inputStateReducer, initialInputState);

  const valueIsValid = validateValue(state.value);

  const hasError = !valueIsValid && state.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const photoChangeHandler = (event) => {
    dispatch({ type: "PHOTO", value: event.target.files[0] });

    return;
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  //   console.log(state);

  return {
    value: state.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    photoChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
