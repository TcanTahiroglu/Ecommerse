import React from 'react';
import { Link } from 'react-router-dom';
import { BsChat } from 'react-icons/bs';

const posts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2346590/pexels-photo-2346590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
    isNew: true
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1209774/pexels-photo-1209774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
    isNew: true
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
    isNew: true
  }
];

const FeaturedPost = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-sm text-[#23A6F0] mb-2">Practice Advice</h3>
          <h2 className="text-2xl font-bold mb-2">Featured Posts</h2>
          <p className="text-sm text-gray-600">
            Problems trying to resolve the conflict between<br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Image Container */}
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-[300px] object-cover"
                />
                {post.isNew && (
                  <span className="absolute top-4 left-4 bg-[#E74040] text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-[#737373]">{tag}</span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4">{post.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">{post.description}</p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-600">{post.date}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <BsChat />
                    <span>{post.comments} comments</span>
                  </div>
                </div>

                {/* Learn More Link */}
                <Link 
                  to={`/post/${post.id}`}
                  className="inline-block mt-4 text-sm text-[#737373] hover:text-[#23A6F0] transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
