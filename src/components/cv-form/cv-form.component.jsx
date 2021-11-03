import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CvForm = ({ setActiveForm }) => {
  const [value, setValue] = useState('');
  return (
    <div className="bg-white shadow-lg rounded border-2 px-8 py-6">
      <div>
        <label className="font-semibold">Location</label>
        <input type="text" className="input-rounded" autoFocus />
      </div>
      <div>
        <label className="font-semibold">Phone Number</label>
        <input type="text" className="input-rounded" />
      </div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <div>
        <label className="font-semibold">Email address</label>
        <input type="text" className="input-rounded" />
      </div>
      <div className="my-6">
        <button
          className="px-6 py-2 rounded-lg text-blue-500 ring-2 ring-gray-200 border-0 mr-2 hover:ring-blue-500"
          onClick={() => setActiveForm(false)}
        >
          Oke
        </button>
        <button
          className="bg-blue-500 px-6 py-2 rounded-lg text-white ring-2 ml-2 hover:bg-blue-400"
          onClick={() => setActiveForm(false)}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default CvForm;
