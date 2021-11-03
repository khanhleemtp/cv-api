import React, { useState } from 'react';
import CvProfile from '../../components/cv-profile/cv-profile.component';
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
      <div className="mx-auto md:ml-96 w-full">
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
        <div className="px-4 py-8 md:px-24 md:py-16 shadow-lg bg-white max-w-4xl">
          <CvProfile field="Name" />
          <CvSection fields={['Location', 'Phone number', 'Email address']} />
          <CvSection fields={['Summary']} />
          <CvSection
            fields={['Position', 'Company name', 'Location', 'Description']}
            addField="Add Work Experience"
            title="Work Experience"
          />
          <CvSection
            fields={['Skill', 'Years of Experience']}
            direction="flex-row"
            title="Skills"
            addField="Add Skills"
          />
          <CvSection
            fields={['School', 'Degree', 'Field of Study', 'Location']}
            title="Education"
            addField="Add Education"
          />
        </div>
      </div>
    </div>
  );
};

export default CvEditorPage;
