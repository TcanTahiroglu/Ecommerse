// data.js
export default {
  colors: {
    primary: "#ffffff",
    secondary: "#333333",
    tertiary: "#999999",
    quaternary: "#f4f4f4",
  },
  shopCategories: [
    {
      name: "Kadın",
      subcategories: [
        { name: "Elbise", link: "/category/women/dress" },
        { name: "Ayakkabı", link: "/category/women/shoes" },
      ],
    },
    {
      name: "Erkek",
      subcategories: [
        { name: "Pantolon", link: "/category/men/pants" },
        { name: "Gömlek", link: "/category/men/shirt" },
      ],
    },
    {
      name: "Çocuk",
      subcategories: [
        { name: "Tişört", link: "/category/kids/tshirt" },
        { name: "Şapka", link: "/category/kids/hat" },
      ],
    },
  ],
  contact: {
    phone: "(123) 456-7890",
    email: "info@shop.com",
    campaign: "Şu anki kampanyalarımızı keşfedin!",
  },
};
