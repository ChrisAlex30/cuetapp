import React, { useEffect } from 'react';

const Navbar = ({timeLeft}) => {


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };
  return (
    <nav className="bg-orange-500 shadow text-white flex flex-row justify-between px-4  w-full z-10 p-2">
      
    <span className="md:text-xl text-lg font-poppins font-bold cursor-pointer">
      CUET-UG MOCK TEST
    </span>
    <span className='md:text-xl text-lg font-medium'>Timer : {formatTime(timeLeft)}</span>

  


</nav>
  );
};

export default Navbar;