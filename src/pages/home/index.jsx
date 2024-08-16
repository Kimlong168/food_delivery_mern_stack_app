import { useState } from "react";
import HeroSection from "./HeroSection";
import MenuListSection from "./MenuListSection";
import TopDishesSection from "./TopDishesSection";
import MobileAppSection from "./MobileAppSection";
import { ProductProvider } from "../../contexts/ProductContext";
import { CategoryProvider } from "../../contexts/CategoryContext";
const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <ProductProvider>
      <CategoryProvider>
        <div>
          <HeroSection />
          <MenuListSection category={category} setCategory={setCategory} />
          <TopDishesSection category={category} />
          <MobileAppSection />
        </div>
      </CategoryProvider>
    </ProductProvider>
  );
};

export default Home;
