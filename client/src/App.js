import { useState, useEffect, useRef } from "react";

import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import MainFooter from "./shared/components/Navigation/MainFooter";
import Notification from "./shared/components/UIElements/Notification";
import NotFound from "./shared/components/Pages/NotFound";
// import useHttp from "./shared/hooks/use-http";
// import { getCurrentUser } from "./shared/lib/api";

import Cart from "./cart/components/Cart";
import Products from "./products/pages/Products";
import ProductsDetail from "./products/pages/ProductsDetail";
import UserProducts from "./user/pages/UserProducts";
import UserProfile from "./user/pages/UserProfile";
import UserAddProduct from "./user/pages/UserAddProduct";
import UserEdit from "./user/pages/UserEdit";
import UserSettings from "./user/pages/UserSettings";
import UserAuth from "./user/pages/UserAuth";
import UserProductsEdit from "./user/pages/UserProductsEdit";
import axios from "axios";
import { cartSliceActions } from "./shared/store/cart-slice";
import UserForgotYourPassword from "./user/pages/UserForgotYourPassword";
import { authSliceActions } from "./shared/store/auth-slice";

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [currentUser, setCurrentUser] = useState();

  const user = useSelector((state) => state.auth.user);

  const [cartIsShown, setCartIsShown] = useState(false);

  const notification = useSelector((state) => state.ui.notification);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  let initial = useRef(true);
  useEffect(() => {
    if (initial.current) {
      initial.current = false;

      return;
    }
    if (cart.changed) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const cartFromLocalStorage = JSON.parse(
        localStorage.getItem("cart") || []
      );
      dispatch(cartSliceActions.fetchItemToCart(cartFromLocalStorage));
    }
  }, [dispatch]);

  // get me
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    if (user) {
      axios
        .get("/api/v1/users/me", { cancelToken: source.token })
        .then((res) => {
          // console.log(res);
          setCurrentUser(res.data.data);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("successfully aborted");
          } else {
            console.log(err);
          }
        });

      return () => {
        source.cancel();
      };
    }

    return () => source.cancel();
  }, [user]);

  // set user to state
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios({
      method: "get",
      url: "/api/v1/users/isLoggedIn",
      cancelToken: source.token,
    })
      .then((res) => {
        const user = res.data.data;
        dispatch(
          authSliceActions.isLoggedIn({
            name: user.name,
            email: user.email,
            photo: user.photo,
            active: user.active,
          })
        );
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("successfully aborted");
        } else {
          console.log(error);
        }
      });

    return () => source.cancel();
  }, [dispatch]);

  if (user && currentUser) {
    return (
      <div className="container">
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
        {cartIsShown && (
          <Cart cartIsShown={cartIsShown} onClose={hideCartHandler} />
        )}
        <MainNavigation onShowCart={showCartHandler} />
        <main className="layout-flex-row__main">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Products />} />
            <Route path="/products/:productId" element={<ProductsDetail />} />

            <Route
              path="profile"
              element={<UserProfile currentUser={currentUser} />}
            >
              <Route path="products" element={<UserProducts />} />
              <Route
                path="products/edit/:productId"
                element={<UserProductsEdit />}
              />
              <Route
                path="product/new"
                element={<UserAddProduct currentUser={currentUser} />}
              />
              <Route
                path="edit"
                element={<UserEdit currentUser={currentUser} />}
              />
              <Route path="settings" element={<UserSettings />} />
            </Route>
          </Routes>
        </main>
        <MainFooter />
      </div>
    );
  }

  return (
    <div className="container">
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {cartIsShown && (
        <Cart cartIsShown={cartIsShown} onClose={hideCartHandler} />
      )}
      <MainNavigation onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Products />} />
            <Route path="/products/:productId" element={<ProductsDetail />} />
            <Route path="/auth" element={<UserAuth />} />
            <Route path="/resetPassword" element={<UserForgotYourPassword />} />
            <Route
              path="/resetPassword/:token"
              element={<UserForgotYourPassword />}
            />
          </>
        </Routes>
      </main>
      <MainFooter />
    </div>
  );
}
export default App;
