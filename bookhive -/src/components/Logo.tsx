import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text flex items-center">
        Book<span className="text-3xl">HIVE</span>
      </div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="url(#gradient)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-6 h-6 ml-1"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
        <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
        <path d="M12 8v13" />
        <path d="M12 8a4 4 0 0 0 8 0H4a4 4 0 0 0 8 0Z" />
      </svg>
    </div>
  );
};

export default Logo;