import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CvForm = ({ setActiveForm }) => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shadow-lg rounded border-2 px-8 py-6">
        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            {...register('location')}
            className="input-rounded"
            autoFocus
          />
        </div>
        <div>
          <label className="font-semibold">Phone Number</label>
          <input type="text" {...register('phone')} className="input-rounded" />
        </div>
        <div>
          <label className="font-semibold">Summary</label>
          <Controller
            name="emailContent"
            control={control}
            defaultValue=""
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={{
                  toolbar: [
                    ['bold', 'italic'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                  ],
                }}
              />
            )}
          />
        </div>

        <div className="my-6">
          <button
            className="px-6 py-2 rounded-lg text-blue-500 ring-2 ring-gray-200 border-0 mr-2 hover:ring-blue-500"
            // onClick={() => setActiveForm(false)}
            type="submit"
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
    </form>
  );
};

export default CvForm;
