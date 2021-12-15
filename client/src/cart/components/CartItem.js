import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li>
      <ProfileCard className={classes["content-layout-1"]}>
        <div className={classes["content-layout-2"]}>
          <img
            src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80"
            alt="shoes"
            className={classes.img}
          />
          <p>Some Product</p>
          <p>X 1</p>
          <p>1000 THB</p>
        </div>
        <div className={classes["margin-button"]}>
          <Button danger>-</Button>
          <Button inverse>+</Button>
        </div>
      </ProfileCard>
    </li>
  );
};

export default CartItem;
