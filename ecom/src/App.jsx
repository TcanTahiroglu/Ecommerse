import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./components/pages/Homepage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
