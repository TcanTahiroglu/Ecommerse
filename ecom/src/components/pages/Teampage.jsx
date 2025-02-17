import React from 'react';
import data from '../../data.json';

const TeamPage = () => {
  return (
    <div className="py-12 px-6 text-center">
      <h1 className="text-3xl font-semibold mb-8">Meet Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.team.map((teamMember) => (
          <div key={teamMember.name} className="bg-quaternary p-6 rounded-lg shadow-lg text-center">
            <img
              src={teamMember.image}
              alt={teamMember.name}
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">{teamMember.name}</h3>
            <p className="text-gray-600">{teamMember.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
