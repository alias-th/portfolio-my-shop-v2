import { Routes, Route } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import MainFooter from "./shared/components/Navigation/MainFooter";

import Products from "./products/pages/Products";
import ProductsDetail from "./products/pages/ProductsDetail";
import UserProducts from "./user/UserProducts";
import UserProfile from "./user/UserProfile";
import UserAddProduct from "./user/UserAddProduct";

function App() {
  return (
    <>
      <MainNavigation />
      <main className="layout-flex-row__main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:productId" element={<ProductsDetail />} />
          <Route path="/profile/edit" element={<UserProfile />} />
          <Route path="/profile/products" element={<UserProducts />} />
          <Route path="/profile/product/new" element={<UserAddProduct />} />
        </Routes>
      </main>
      <MainFooter />
    </>
  );
}

export default App;
