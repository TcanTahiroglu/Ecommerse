import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken } from './store/actions/userActions';
import PageLayout from './components/layout/PageLayout';
import HomePage from './components/pages/Homepage';
import Shoppage from './components/pages/Shoppage';
import AboutPage from './components/pages/AboutUs';
import ContactPage from './components/pages/ContactPage';
import ProductDetail from './components/pages/ProductDetail';
import LoginForm from './components/pages/LoginForm';
import SignupForm from './components/pages/SignupForm';
import TeamPage from './components/pages/Teampage';
import ProductList from './components/pages/ProductList';
import ShoppingCartPage from './components/pages/ShoppingCartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shoppage />} />
          <Route path="/shop/:gender/:categoryName/:categoryId" element={<Shoppage />} />
          <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/teams" element={<TeamPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
        </Routes>
      </PageLayout>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
