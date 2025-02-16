import React from "react";
import data from "../../data";

const FeaturedPost = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Featured Posts</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {data.featuredPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-auto" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <p className="text-gray-400 mt-2">{post.date}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-lg">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPost;
