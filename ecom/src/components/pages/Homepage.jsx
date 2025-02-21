import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CategoryPick from "../layout/CategoryPick";
import HeroSlider from "../layout/HeroSlider";
import ProductCategory from "../layout/ProductCategory";
import Slider from "../layout/slider";
import C2A from "../layout/c2a";
import FeaturedPost from "../layout/FeaturedPost";
import TopCategories from "../TopCategories";
import { fetchCategories } from "../../store/actions/categoryActions";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <HeroSlider />
      <TopCategories />
      <CategoryPick />
      <ProductCategory />
      <Slider />
      <C2A />
      <FeaturedPost />
    </div>
  );
};

export default HomePage;