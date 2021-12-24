import { useEffect, useState } from "react";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import classes from "./NotFound.module.css";

function NotFound() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className={classes["form-404"]}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loading) {
    return (
      <div className={classes["form-404"]}>
        <p>404</p>
        <p>Page Not Found</p>
      </div>
    );
  }
}

export default NotFound;
