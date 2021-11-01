import React, { useState } from 'react';
import CvSettings from '../../components/cv-settings/cv-setting.component';
import DialogApp from '../../components/dialog/dialog.component';
import CvSection from './../../components/cv-section/cv-section.component';

const CvEditorPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-grow p-4 bg-gray-100">
      <div
        className="fixed top-16 left-0 h-screen w-full max-w-sm m-0
                    hidden md:flex flex-col 
                    bg-white shadow-lg"
      >
        <CvSettings />
      </div>
      <DialogApp open={open} setOpen={setOpen} />
      <div className="ml-0 md:ml-96 w-full">
        <div className="flex w-full max-w-sm justify-start items-center mt-2 mb-6">
          <button className="btn-cv" onClick={() => setOpen(!open)}>
            Customize
          </button>
          <button className="btn-cv" onClick={() => setOpen(!open)}>
            Preview
          </button>
          <button className="btn-cv" onClick={() => setOpen(!open)}>
            Download
          </button>
        </div>
        <CvSection />
      </div>
    </div>
  );
};

export default CvEditorPage;
