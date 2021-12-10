import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

function Home() {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch("/api/v2/products");
      const responseData = await res.json();
      setData(responseData.message);
    };

    fetchMessage();
  }, []);
  return (
    <>
      <h2>{data}</h2>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
