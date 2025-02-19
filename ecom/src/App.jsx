import React from 'react';
import { Provider } from 'react-redux'; // 'react-redux' kütüphanesinden 'Provider'ı import edin
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ShopPage from "./components/pages/Shoppage";
import ProductDetail from "./components/pages/ProductDetail";
import Header from "./components/layout/Header";
import Footer from "./components/layout/footer";
import ContactPage from "./components/pages/ContactPage";
import TeamPage from "./components/pages/Teampage";
import AboutUs from "./components/pages/AboutUs";
import Signup from "./components/pages/SignupForm";
import store from "./store/store.js";
import LoginForm from './components/pages/LoginForm';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/teams" element={<TeamPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
