import React from 'react';
import { PencilAltIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

const CvProfile = ({ field, icon = true }) => {
  return (
    <div className="flex justify-between hover:bg-gray-100 cursor-pointer rounded-md py-2 my-2 text-blue-500">
      <div className="flex flex-col flex-grow items-center">
        <div className="w-20 h-20 mb-4 rounded-full bg-blue-400"></div>
        <div className="text-4xl p-2 m-1 mx-2 rounded-md bg-yellow-100 hover:bg-yellow-200">
          {field}
        </div>
      </div>
      <PencilAltIcon className={clsx('w-6 h-6', { hidden: !icon })} />
    </div>
  );
};

export default CvProfile;
