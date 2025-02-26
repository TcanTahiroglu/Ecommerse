import React from 'react';
import HeroSlider from '../layout/HeroSlider';
import CategoryPick from "../layout/CategoryPick";
import ProductCategory from "../layout/ProductCategory";
import Slider from "../layout/slider";
import C2A from "../layout/c2a";
import FeaturedPost from "../layout/FeaturedPost";

const Homepage = () => {
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

export default Homepage;