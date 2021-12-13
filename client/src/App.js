import { Routes, Route } from "react-router-dom";
import Products from "./products/pages/Products";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import MainFilter from "./shared/components/Filter/MainFilter";

function App() {
  return (
    <>
      <MainNavigation />
      <main className="layout-flex-row__main">
        <MainFilter />
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
