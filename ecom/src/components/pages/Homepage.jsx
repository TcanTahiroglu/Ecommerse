import React from 'react';
import HeroSlider from '../layout/HeroSlider';
import EditorsPick from '../layout/EditorsPick';
import BestsellerProducts from '../layout/BestsellerProducts';
import Slider from "../layout/slider";
import C2A from "../layout/c2a";
import FeaturedPost from "../layout/FeaturedPost";

const Homepage = () => {
  return (
    <div>
      <HeroSlider />
      <EditorsPick />
      <BestsellerProducts />
      <Slider />
      <C2A />
      <FeaturedPost />
    </div>
  );
};

export default Homepage;