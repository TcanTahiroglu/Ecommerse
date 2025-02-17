import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ShopPage from "./components/pages/Shoppage";
import ProductDetail from "./components/pages/ProductDetail";
import Header from "./components/layout/Header";
import Footer from "./components/layout/footer";
import ContactPage from "./components/pages/ContactPage";
import TeamPage from "./components/pages/Teampage";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/teams" element={<TeamPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
