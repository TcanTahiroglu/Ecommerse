import React from 'react';

const C2A = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1545912193-31ce2f0e9a08?q=80&w=2574"
              alt="Happy couple in winter clothes"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="max-w-lg">
            <span className="text-sm text-gray-600 font-bold mb-4 block">SUMMER 2020</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#252B42] mb-6">Part of the Neural Universe</h2>
            <p className="text-gray-600 mb-8">We know how large objects will act, but things on a small scale.</p>
            <div className="flex gap-4">
              <button className="bg-[#2DC071] hover:bg-[#2DC071]/90 text-white px-8 py-3 rounded font-bold transition-colors">
                BUY NOW
              </button>
              <button className="border-2 border-[#2DC071] text-[#2DC071] hover:bg-[#2DC071] hover:text-white px-8 py-3 rounded font-bold transition-colors">
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
