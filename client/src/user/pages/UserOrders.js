import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import UserOrderList from "../components/UserOrderList";

import classes from "./UserOrders.module.css";

function UserOrders() {
  return (
    <ProfileCard className={classes["card__container"]}>
      <p className="heading-style-1">Your Order</p>
      <hr />
      <ul>
        <UserOrderList />
      </ul>
    </ProfileCard>
  );
}

export default UserOrders;
