import React, { useState } from 'react';
import CvSettings from '../../components/cv-settings/cv-setting.component';
import DialogApp from '../../components/dialog/dialog.component';
import Form from './../../components/form/form';

import TitlImage from './../../components/tilt-image/tilt-image.component';
const CvEditorPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-full flex-grow p-4">
      <div
        className="fixed top-16 left-0 h-screen w-full max-w-sm m-0
                    hidden md:flex flex-col 
                    bg-white shadow-lg"
      >
        <CvSettings />
      </div>
      <DialogApp open={open} setOpen={setOpen} />
      <div className="ml-0 md:ml-96">
        <button
          className="block md:hidden bg-blue-500 text-white rounded-md p-2 px-8"
          onClick={() => setOpen(!open)}
        >
          Customize
        </button>
        <Form />
        <TitlImage />
        {/* <CvPreview /> */}
      </div>
    </div>
  );
};

export default CvEditorPage;
