import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { isLoggedInAction } from "./shared/store/auth-actions";

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

function App() {
  const [currentUser, setCurrentUser] = useState();

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [cartIsShown, setCartIsShown] = useState(false);

  const notification = useSelector((state) => state.ui.notification);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

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
    dispatch(isLoggedInAction());

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
          </>
        </Routes>
      </main>
      <MainFooter />
    </div>
  );
}
export default App;
