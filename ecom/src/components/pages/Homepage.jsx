import React from "react";
import CategoryPick from "../layout/CategoryPick";
import HeroSlider from "../layout/HeroSlider";
import ProductCategory from "../layout/ProductCategory";
import Slider from "../layout/slider";
import C2A from "../layout/c2a";
import FeaturedPost from "../layout/FeaturedPost";


const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <CategoryPick />
      <ProductCategory />
      <Slider />
      <C2A />
      <FeaturedPost />
    </div>
  );
};

export default HomePage;