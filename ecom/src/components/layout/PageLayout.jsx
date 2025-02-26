import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { fetchCategories } from '../../store/actions/categoryActions';

const PageLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Kategorileri yükle
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
