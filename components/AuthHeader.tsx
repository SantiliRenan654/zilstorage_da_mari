import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <div className="bg-[#2a2a2a] p-2 flex justify-between items-center border-b border-gray-500">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-green-400">Zil</span>
        <span className="text-sm font-semibold text-gray-300">STORAGE</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
    </div>
  );
};

export default AuthHeader;