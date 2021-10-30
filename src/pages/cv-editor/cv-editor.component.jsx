import Form from './../../components/form/form';
import CvPreview from '../../components/cv-preview/cv-preview.component';
import Tilt from 'react-tilt';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import TitlImage from './../../components/tilt-image/tilt-image.component';
import TemplatePreview from '../../components/template-preview/template-preview.component';
const CvEditorPage = () => {
  return (
    <div className="flex bg-white h-full flex-grow p-4">
      <div
        className="fixed top-16 left-0 h-screen w-full max-w-sm m-0
                    hidden md:flex flex-col 
                    bg-white shadow-lg"
      >
        <Tab.Group>
          <Tab.List className="flex justify-between border-b-2">
            {['Template', 'Styles', 'Sections'].map((item) => (
              <Tab key={item} as="div" className="flex-grow flex">
                {({ selected }) => (
                  <button className="bg-white text-black flex-grow flex flex-col items-center hover:bg-gray-100 pt-3 font-semibold">
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
          <Tab.Panels
            className=" overflow-y-scroll
                      no-scrollbar pb-28 px-6 pt-4 mx-auto"
          >
            <Tab.Panel className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => (
                <TemplatePreview key={item} />
              ))}
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
            {/* ... */}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="ml-0 md:ml-96">
        <Form />
        <TitlImage />
        {/* <CvPreview /> */}
      </div>
    </div>
  );
};

export default CvEditorPage;
