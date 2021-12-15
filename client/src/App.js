import { Routes, Route } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import MainFooter from "./shared/components/Navigation/MainFooter";

import Products from "./products/pages/Products";
import ProductsDetail from "./products/pages/ProductsDetail";
import UserProducts from "./user/pages/UserProducts";
import UserProfile from "./user/pages/UserProfile";
import UserAddProduct from "./user/pages/UserAddProduct";
import UserEdit from "./user/pages/UserEdit";
import UserSettings from "./user/pages/UserSettings";

function App() {
  return (
    <>
      <MainNavigation />
      <main className="layout-flex-row__main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:productId" element={<ProductsDetail />} />
          <Route path="profile" element={<UserProfile />}>
            <Route path="products" element={<UserProducts />} />
            <Route path="product/new" element={<UserAddProduct />} />
            <Route path="edit" element={<UserEdit />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
        </Routes>
      </main>
      <MainFooter />
    </>
  );
}

export default App;
