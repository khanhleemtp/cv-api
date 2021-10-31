import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { BriefcaseIcon } from '@heroicons/react/outline';
const HoverDropdown = ({
  links = [],
  button = 'Dropdown',
  isActive = false,
}) => {
  return (
    <div className="group inline-block relative cursor-pointer">
      <div
        className={clsx(
          'font-semibold py-2 px-4 rounded inline-flex items-center group-hover:text-blue-500',
          { 'text-blue-500': isActive }
        )}
      >
        <span className="mr-1">{button}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </div>
      <ul className="absolute hidden text-gray-600 pt-2 group-hover:block rounded-sm shadow-xl border-1 z-10">
        {links?.map((link) => (
          <li
            className="flex flex-col bg-white whitespace-no-wrap"
            key={link.name}
          >
            <Link
              className="hover:bg-gray-100 py-2 px-4 flex items-center
                min-w-max hover:text-blue-500"
              to={link.to}
            >
              <BriefcaseIcon className="w-4 h-4 mr-2" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HoverDropdown;
