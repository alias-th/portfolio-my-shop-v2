import { useSelector } from "react-redux";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import useHttp from "../../shared/hooks/use-http";
import { deleteReviewWithId } from "../../shared/lib/api";

import classes from "./ProductsReviewsItem.module.css";

function ReviewsItem(props) {
  const user = useSelector((state) => state.auth.user);

  const { sendRequest: deleteReviewWithIdRequest } = useHttp(
    deleteReviewWithId,
    true,
    "Deleted your review successfully",
    true
  );

  const onClickDeleteReviewHandler = () => {
    deleteReviewWithIdRequest(props.id);
  };

  return (
    <Card>
      <li className={classes["review-layout-1"]}>
        <img
          src={`/uploads/images/users/${props.photo}`}
          alt={props.userName}
          className={classes["review-img"]}
        />
        <div className={classes["review-layout-2"]}>
          <div className={classes["review__container__name-and-date"]}>
            <p className={classes["review__p--name"]}>{`${props.userName} `}</p>
            <p className={classes["review__p--date"]}>
              {new Date(props.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                year: "numeric",
                day: "numeric",
                hour: "numeric",
              })}
            </p>
          </div>
          <p>{props.rating}</p>
          <p className={classes["review-description"]}>{props.review}</p>
        </div>
        <div className={classes["review__container__button"]}>
          {user
            ? user.name === props.userName && (
                <>
                  <Button primary onClick={props.onClickShowFormEditHandler}>
                    Edit
                  </Button>
                  <Button onClick={onClickDeleteReviewHandler}>Delete</Button>
                </>
              )
            : ""}
        </div>
      </li>
    </Card>
  );
}

export default ReviewsItem;
