import { Routes, Route } from "react-router-dom";
import Products from "./products/pages/Products";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  return (
    <>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
