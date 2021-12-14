import ProfileCard from "../../shared/components/UIElements/ProfileCard";

import Button from "../../shared/components/FormElements/Button";

import classes from "./UserAddProduct.module.css";

function UserAddProduct() {
  return (
    <ProfileCard className={classes["content-layout"]}>
      <p className="heading-style-1">Add Product</p>
      <hr />
      <div className={classes.item}>
        <div className={classes.itemName}>
          <p>Profile Picture</p>
        </div>
        <div className={classes.itemContent}>
          <button className={classes.btn}>Choose File</button>
          <div className={classes.circle}>
            <img
              src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
              alt="user-1"
              className={classes.img}
            />
          </div>
          <p>
            Must be a .jpg file smaller than 10 mb and at least 100px by 100px
          </p>
        </div>
      </div>
      <div className={`${classes.item} ${classes.alignItemCenter}`}>
        <div className={classes.itemName}>
          <p>Name</p>
        </div>
        <div className={classes.itemContent}>
          <input className={classes.input} />
        </div>
      </div>
      <div className={`${classes.item} ${classes.alignItemCenter}`}>
        <div className={classes.itemName}>
          <p>Size</p>
        </div>
        <div className={`${classes.itemContent} ${classes.flexRow}`}>
          <input className={classes.input} />
          <select className={classes.selector}>
            <option value="">--Please choose an option--</option>
            <option value="uk">UK</option>
            <option value="us">US</option>
            <option value="eur">EUR</option>
          </select>
        </div>
      </div>
      <div className={`${classes.item} ${classes.alignItemCenter}`}>
        <div className={classes.itemName}>
          <p>Color</p>
        </div>
        <div className={classes.itemContent}>
          <input className={classes.input} />
        </div>
      </div>
      <div className={`${classes.item} ${classes.alignItemCenter}`}>
        <div className={classes.itemName}>
          <p>Description</p>
        </div>
        <div className={classes.itemContent}>
          <textarea className={classes.input} />
        </div>
      </div>
      <div className={`${classes.item} ${classes.alignItemCenter}`}>
        <div className={classes.itemName}>
          <p>Quantity</p>
        </div>
        <div className={classes.itemContent}>
          <input className={classes.input} />
        </div>
      </div>
      <div className={`${classes.item} ${classes.alignItemCenter}`}>
        <div className={classes.itemName}>
          <p>Price (Bath)</p>
        </div>
        <div className={classes.itemContent}>
          <input className={classes.input} />
        </div>
      </div>
      <div className={`${classes.item} ${classes.alignItemCenter}`}>
        <div className={classes.itemName}>
          <p>Category</p>
        </div>
        <div className={classes.itemContent}>
          <select className={classes.selector}>
            <option value="">--Please choose an option--</option>
            <option value="shoes">Shoes</option>
            <option value="clothing">clothing</option>
          </select>
        </div>
      </div>

      <div className={`${classes.item} ${classes.alignItemCenter}`}>
        <div className={classes.itemName}></div>
        <div className={`${classes.itemContent} ${classes.flexRow} `}>
          <Button inverse>Add Product</Button>
        </div>
      </div>
    </ProfileCard>
  );
}

export default UserAddProduct;
