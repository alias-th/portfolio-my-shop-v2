import { useState, useEffect, useRef, lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import MainFooter from "./shared/components/Navigation/MainFooter";

import Notification from "./shared/components/UIElements/Notification";

import Cart from "./cart/components/Cart";

import { cartSliceActions } from "./shared/store/cart-slice";
import { authSliceActions } from "./shared/store/auth-slice";

import UserForgotYourPassword from "./user/pages/UserForgotYourPassword";
import UserAuth from "./user/pages/UserAuth";
import NotFound from "./shared/components/Pages/NotFound";
import UserSettings from "./user/pages/UserSettings";
import UserProductsEdit from "./user/pages/UserProductsEdit";

const Products = lazy(() => import("./products/pages/Products"));
const ProductsDetail = lazy(() => import("./products/pages/ProductsDetail"));
const UserProducts = lazy(() => import("./user/pages/UserProducts"));
const UserProfile = lazy(() => import("./user/pages/UserProfile"));
const UserAddProduct = lazy(() => import("./user/pages/UserAddProduct"));
const UserEdit = lazy(() => import("./user/pages/UserEdit"));
const UserOrders = lazy(() => import("./user/pages/UserOrders"));

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
        // console.log(user);
        dispatch(
          authSliceActions.isLoggedIn({
            id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            role: user.role,
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

        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <Suspense fallback={<></>}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <Suspense fallback={<></>}>
                <ProductsDetail />
              </Suspense>
            }
          />

          <Route
            path="profile"
            element={
              <Suspense fallback={<></>}>
                <UserProfile currentUser={currentUser} />{" "}
              </Suspense>
            }
          >
            <Route
              path="products"
              element={
                <Suspense fallback={<></>}>
                  <UserProducts />
                </Suspense>
              }
            />
            <Route
              path="products/edit/:productId"
              element={<UserProductsEdit />}
            />
            <Route
              path="product/new"
              element={
                <Suspense fallback={<></>}>
                  <UserAddProduct currentUser={currentUser} />
                </Suspense>
              }
            />
            <Route
              path="edit"
              element={
                <Suspense fallback={<></>}>
                  <UserEdit currentUser={currentUser} />
                </Suspense>
              }
            />
            <Route path="settings" element={<UserSettings />} />

            <Route
              path="orders"
              element={
                <Suspense fallback={<></>}>
                  <UserOrders />
                </Suspense>
              }
            />
          </Route>
        </Routes>

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

      <Routes>
        <Route path="*" element={<NotFound />} />
        <>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <Suspense fallback={<></>}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <Suspense fallback={<></>}>
                <ProductsDetail />
              </Suspense>
            }
          />
          <Route path="/auth" element={<UserAuth />} />
          <Route path="/resetPassword" element={<UserForgotYourPassword />} />
          <Route
            path="/resetPassword/:token"
            element={<UserForgotYourPassword />}
          />
        </>
      </Routes>

      <MainFooter />
    </div>
  );
}
export default App;
