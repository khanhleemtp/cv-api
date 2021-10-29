import Form from './../../components/form/form';
import CvPreview from '../../components/cv-preview/cv-preview.component';
import Tilt from 'react-tilt';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import clsx from 'clsx';
const CvEditorPage = () => {
  return (
    <div className="flex bg-white h-full flex-grow p-4">
      <div
        className="fixed top-16 left-0 h-screen w-full max-w-sm m-0 pt-4
                    hidden md:flex flex-col 
                    bg-white shadow-lg"
      >
        <Tab.Group>
          <Tab.List className="flex justify-between border-b-2">
            {['Template', 'Styles', 'Sections'].map((item) => (
              <Tab key={item} as="div" className="flex-grow flex">
                {({ selected }) => (
                  <button className="bg-white text-black flex-grow flex flex-col items-center hover:bg-gray-100 pt-3">
                    <div className="flex-grow">{item}</div>
                    <div
                      className={clsx(
                        'border-b-4 rounded-lg border-blue-500 w-0 transition-all duration-100 ease-in-out',
                        { 'w-full': selected }
                      )}
                    ></div>
                  </button>
                )}
              </Tab>
            ))}

            {/* ...  */}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Content 1</Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
            {/* ... */}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="ml-0 md:ml-96">
        <Form />
        <Tilt
          className="Tilt cursor-pointer"
          options={{ max: 25 }}
          style={{ height: 297 * 0.7, width: 210 * 0.7 }}
        >
          <img
            src="/assets/cv1.png"
            alt="cv"
            className="w-full h-full Tilt-inner"
          />
        </Tilt>
        {/* <CvPreview /> */}
      </div>
    </div>
  );
};

export default CvEditorPage;
