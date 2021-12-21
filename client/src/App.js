import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { isLoggedInAction } from "./shared/store/auth-actions";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import MainFooter from "./shared/components/Navigation/MainFooter";
import Notification from "./shared/components/UIElements/Notification";
import NotFound from "./shared/components/Pages/NotFound";
import useHttp from "./shared/hooks/use-http";
import { getCurrentUser } from "./shared/lib/api";

import Cart from "./cart/components/Cart";
import Products from "./products/pages/Products";
import ProductsDetail from "./products/pages/ProductsDetail";
import UserProducts from "./user/pages/UserProducts";
import UserProfile from "./user/pages/UserProfile";
import UserAddProduct from "./user/pages/UserAddProduct";
import UserEdit from "./user/pages/UserEdit";
import UserSettings from "./user/pages/UserSettings";
import UserAuth from "./user/pages/UserAuth";

function App() {
  const user = useSelector((state) => state.auth.user);

  const { sendRequest, data } = useHttp(getCurrentUser);

  const dispatch = useDispatch();

  const [cartIsShown, setCartIsShown] = useState(false);

  const notification = useSelector((state) => state.ui.notification);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    if (user) {
      sendRequest();
    }
  }, [sendRequest, user]);

  useEffect(() => {
    dispatch(isLoggedInAction());
  }, [dispatch]);

  return (
    <>
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
          {user && (
            <Route path="profile" element={<UserProfile currentUser={data} />}>
              <Route path="products" element={<UserProducts />} />
              <Route path="product/new" element={<UserAddProduct />} />
              <Route path="edit" element={<UserEdit />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>
          )}
          {!user && <Route path="/auth" element={<UserAuth />} />}
        </Routes>
      </main>
      <MainFooter />
    </>
  );
}

export default App;
