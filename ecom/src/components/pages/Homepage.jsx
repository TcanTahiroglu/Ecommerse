import React from "react";
import CategoryPick from "../layout/CategoryPick";
import HeroSlider from "../layout/HeroSlider";
import Header from "../layout/Header";

const HomePage = () => {
  return (
    <div>
        <Header />
      <HeroSlider />
      <CategoryPick />
    </div>
  );
};

export default HomePage;