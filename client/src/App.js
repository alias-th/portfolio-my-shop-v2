import { Routes, Route } from "react-router-dom";
import Products from "./products/pages/Products";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import ProductsDetail from "./products/pages/ProductsDetail";

function App() {
  return (
    <>
      <MainNavigation />
      <main className="layout-flex-row__main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:productId" element={<ProductsDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
