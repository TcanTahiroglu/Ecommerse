import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken } from './store/actions/userActions';
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
  const dispatch = useDispatch();

  useEffect(() => {
    // LocalStorage'da token varsa doğrula
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(verifyToken())
        .catch((error) => {
          console.error('Token verification failed:', error);
        });
    }
  }, [dispatch]);

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
      </Routes>
    </PageLayout>
  );
}

export default App;
