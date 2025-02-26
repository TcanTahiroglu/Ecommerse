import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import HomePage from './components/pages/Homepage';
import ShopPage from './components/pages/Shoppage';
import AboutPage from './components/pages/AboutUs';
import ContactPage from './components/pages/ContactPage';
import ProductDetail from './components/pages/ProductDetail';
import LoginForm from './components/pages/LoginForm';
import SignupForm from './components/pages/SignupForm';
import TeamPage from './components/pages/Teampage';
import ProductList from './components/pages/ProductList';

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/teams" element={<TeamPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
<<<<<<< HEAD
        <Route path="/products" element={<ProductList />} />
      </Route>
    </Routes>
=======
      </Routes>
    </PageLayout>
>>>>>>> parent of 6a04b81 (görsel biraz düzenlendi)
  );
}

export default App;
