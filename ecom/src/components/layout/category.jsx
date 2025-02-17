const Category = () => {
    const categories = [
      { name: "Kadın", image: "/images/dummy_240x242.png" },
      { name: "Erkek", image: "/images/dummy_240x242.png" },
      { name: "Çocuk", image: "/images/dummy_240x242.png" },
      { name: "Aksesuar", image: "/images/dummy_240x242.png" },
      { name: "Teknoloji", image: "/images/dummy_240x242.png" },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4 mt-30">Shop</h1>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {categories.map((category, index) => (
            <div key={index} className="text-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
              <p className="mt-2 font-semibold">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Category;
  