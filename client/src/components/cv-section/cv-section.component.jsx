import React, { useState } from 'react';
import { PencilAltIcon, PlusIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import CvForm from '../cv-form/cv-form.component';

const CvSection = ({
  fields = [],
  icon = true,
  addField = '',
  direction = 'flex-col',
  title = '',
}) => {
  const [activeForm, setActiveForm] = useState(false);

  return (
    <div>
      {title && (
        <div className="border-t-2 border-b-2 text-center uppercase text-xl text-blue-500 py-2 my-4 font-semibold">
          {title}
        </div>
      )}
      {activeForm && (
        <CvForm activeForm={activeForm} setActiveForm={setActiveForm} />
      )}
      {!activeForm && (
        <div
          className="flex justify-between hover:bg-gray-100 cursor-pointer rounded-md py-2"
          onClick={() => setActiveForm(true)}
        >
          <div className={`flex ${direction}`}>
            {fields?.map((field) => (
              <div
                className="p-2 m-1 rounded-md bg-yellow-100 hover:bg-yellow-200"
                key={field}
              >
                {field}
              </div>
            ))}
          </div>
          <PencilAltIcon
            className={clsx('w-6 h-6 text-blue-500', { hidden: !icon })}
          />
        </div>
      )}

      <button
        className={clsx(
          'mx-2 my-6 font-bold text-blue-500 hover:text-blue-400 inline-flex items-center',
          { hidden: !addField }
        )}
      >
        <PlusIcon className="w-4 h-4 mr-1" />
        {addField}
      </button>
    </div>
  );
};

export default CvSection;
