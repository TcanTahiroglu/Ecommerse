import React from 'react';

const C2A = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <img
              src="https://images.pexels.com/photos/4557876/pexels-photo-4557876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Happy couple in winter clothes"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-4">
            <span className="text-sm text-gray-600">SUMMER 2020</span>
            <h2 className="text-4xl font-bold text-gray-900">Part of the Neural Universe</h2>
            <p className="text-gray-600">
              We know how large objects will act,<br />
              but things on a small scale.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="bg-[#2DC071] hover:bg-[#2AA563] text-white px-6 py-3 rounded transition-colors">
                BUY NOW
              </button>
              <button className="border-2 border-[#2DC071] text-[#2DC071] hover:bg-[#2DC071] hover:text-white px-6 py-3 rounded transition-colors">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default C2A;
