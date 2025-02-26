import React from 'react';
import { FaArrowRight, FaRegClock, FaRegComments, FaChartLine } from 'react-icons/fa';

const FeaturedPost = () => {
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=2574',
      category: 'Google',
      tag: 'New',
      title: 'Loudest à la Madison #1 (L\'integral)',
      description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: 10
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?q=80&w=2572',
      category: 'Trending',
      tag: 'New',
      title: 'Loudest à la Madison #1 (L\'integral)',
      description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: 10
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=2570',
      category: 'Design',
      tag: 'New',
      title: 'Loudest à la Madison #1 (L\'integral)',
      description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: 10
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h5 className="text-[#23A6F0] text-sm font-bold mb-2">Practice Advice</h5>
          <h2 className="text-[#252B42] text-4xl font-bold mb-4">Featured Posts</h2>
          <p className="text-[#737373]">
            Problems trying to resolve the conflict between<br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Image Container */}
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#E74040] text-white text-xs font-bold px-3 py-1 rounded">
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Categories */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#737373] text-sm">{post.category}</span>
                  <span className="text-[#737373] text-sm">Trending</span>
                  <span className="text-[#737373] text-sm">New</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-[#252B42] text-xl font-bold mb-4">{post.title}</h3>
                <p className="text-[#737373] text-sm mb-4">{post.description}</p>

                {/* Meta Info */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2 text-[#737373]">
                    <FaRegClock className="text-[#23A6F0]" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#737373]">
                    <FaRegComments className="text-[#23856D]" />
                    <span className="text-sm">{post.comments} comments</span>
                  </div>
                </div>

                {/* Learn More */}
                <button className="flex items-center gap-2 text-[#737373] mt-4 hover:text-[#23A6F0] transition-colors">
                  <span className="text-sm font-bold">Learn More</span>
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
