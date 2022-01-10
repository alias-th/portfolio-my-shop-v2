import classes from "./SearchResults.module.css";

import Card from "../UIElements/Card";
import { Link } from "react-router-dom";

function SearchResults(props) {
  return (
    <li>
      <Link
        to={`/products/${props.id}`}
        className={classes["link-hover"]}
        onClick={props.onClickResetTextSearch}
      >
        <Card className={classes["search-item"]}>
          {props.imageCover && (
            <img
              src={`/uploads/images/products/${props.imageCover}`}
              alt={props.name}
              className={classes["item-img"]}
            />
          )}
          <p>{props.name}</p>
        </Card>
      </Link>
    </li>
  );
}

export default SearchResults;
