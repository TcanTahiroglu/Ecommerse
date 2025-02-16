import React from "react";
import CategoryPick from "../layout/CategoryPick";
import HeroSlider from "../layout/HeroSlider";
import Header from "../layout/Header";
import ProductCategory from "../layout/ProductCategory";
import Slider from "../layout/slider";
import C2A from "../layout/c2a";
import FeaturedPost from "../layout/FeaturedPost";
import Footer from "../layout/footer";

const HomePage = () => {
  return (
    <div>
        <Header />
      <HeroSlider />
      <CategoryPick />
      <ProductCategory />
      <Slider />
      <C2A />
      <FeaturedPost />
      <Footer />
    </div>
  );
};

export default HomePage;