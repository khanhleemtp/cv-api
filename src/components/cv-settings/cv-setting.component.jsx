import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import TemplatePreview from '../../components/template-preview/template-preview.component';
import ColorSelected from '../../components/color-selected/color-selected.component';
import DragDropSection from '../../components/drag-drop-section/drag-drop-section.component';
import SwitchInput from './../../components/switch/switch.component';

const CvSettings = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex justify-between border-b-2">
        {['Template', 'Styles', 'Sections'].map((item) => (
          <Tab key={item} as="div" className="flex-grow flex">
            {({ selected }) => (
              <button className="bg-white text-black flex-grow flex flex-col items-center hover:bg-gray-100 pt-3 font-semibold">
                <div className="flex-grow">{item}</div>
                <div
                  className={clsx(
                    'border-b-4 rounded-lg border-blue-500 w-0 transition-all duration-75 ease-linear',
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
                      no-scrollbar pb-28 pt-6"
      >
        <Tab.Panel>
          <div className="mx-auto max-w-xs md:max-w-sm md:mx-0 grid grid-cols-2 gap-4 md:px-4">
            {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => (
              <TemplatePreview key={item} />
            ))}
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="divide-y-2 w-full">
            <div className="colors px-6 pb-8">
              <div className="font-bold mb-4">Accent Color</div>
              <div className="max-w-sm mx-auto md:max-w-md md:mx-0 grid grid-cols-7 gap-3">
                {[
                  'gray',
                  'yellow',
                  'indigo',
                  'purple',
                  'red',
                  'green',
                  'blue',
                  'pink',
                ]?.map((color) => (
                  <ColorSelected key={color} color={color} />
                ))}
              </div>
            </div>
            <div className="font px-6 pt-6">
              <div className="font-bold mb-6">Font</div>
              <select className="w-full input-rounded">
                {['A', 'B', 'C', 'D']?.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div>
            <div className="px-4 pb-4">
              <h4 className="font-bold leading-relaxed">Resumes Sections</h4>
              <p className="text-sm">
                Drag and drop to re-order sections of your resume or toggle
                their visibility.
              </p>
            </div>
            <div>
              {[
                { Name: false },
                { Info: false },
                { 'Professtional Summary': true },
              ]?.map((item) => (
                <div
                  className="border-t-2 px-2 py-2 bg-gray-100 flex cursor-not-allowed"
                  key={Object.getOwnPropertyNames(item)}
                >
                  <div className="flex-grow ml-2">
                    {Object.getOwnPropertyNames(item)}
                  </div>
                  {Object.values(item)[0] ? <SwitchInput /> : null}
                </div>
              ))}
            </div>
            <DragDropSection />
          </div>
        </Tab.Panel>
        {/* ... */}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default CvSettings;
