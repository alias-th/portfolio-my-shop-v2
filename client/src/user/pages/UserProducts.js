import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import UserProductsList from "../components/UserProductsList";

import classes from "./UserProducts.module.css";

function UserProducts() {
  return (
    <ProfileCard className={classes["card__container"]}>
      <p className="heading-style-1">Your Product</p>
      <hr />
      <ul>
        <UserProductsList />
      </ul>
    </ProfileCard>
  );
}

export default UserProducts;
