import React from 'react';
import { PencilAltIcon } from '@heroicons/react/outline';

const CvSection = () => {
  return (
    <div className="px-4 py-8 md:px-12 md:py-16 shadow-lg bg-white max-w-4xl">
      <div className="flex items-center justify-between hover:bg-gray-100 border-b-2 rounded-md py-2 text-blue-400 cursor-pointer">
        <div className="font-bold text-4xl">Le Dinh Khanh</div>
        <PencilAltIcon className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex justify-between hover:bg-gray-100 cursor-pointer rounded-md py-2 my-2">
        <div className="flex flex-col ">
          <div className="p-2 m-1 mx-2 rounded-md bg-yellow-200">Location</div>
          <div className="p-2 m-1 mx-2 rounded-md bg-yellow-200">
            Phone number
          </div>
          <div className="p-2 m-1 mx-2 rounded-md bg-yellow-200">
            Email address
          </div>
        </div>
        <PencilAltIcon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  );
};

export default CvSection;
