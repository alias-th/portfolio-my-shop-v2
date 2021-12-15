import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserProducts.module.css";

function UserProducts() {
  return (
    <ProfileCard className={classes["content-layout"]}>
      <p className="heading-style-1">Your Product</p>
      <hr />
      <ul>
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
            </div>
            <div>
              <Button primary>View</Button>
              <Button inverse>Edit</Button>
              <Button danger>Delete</Button>
            </div>
          </ProfileCard>
        </li>
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
            </div>
            <div>
              <Button primary>View</Button>
              <Button inverse>Edit</Button>
              <Button danger>Delete</Button>
            </div>
          </ProfileCard>
        </li>
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
            </div>
            <div>
              <Button primary>View</Button>
              <Button inverse>Edit</Button>
              <Button danger>Delete</Button>
            </div>
          </ProfileCard>
        </li>
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
            </div>
            <div>
              <Button primary>View</Button>
              <Button inverse>Edit</Button>
              <Button danger>Delete</Button>
            </div>
          </ProfileCard>
        </li>
      </ul>
    </ProfileCard>
  );
}

export default UserProducts;
