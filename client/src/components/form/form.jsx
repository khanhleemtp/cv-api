import { useForm, FormProvider } from 'react-hook-form';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// {
//   "name": "LDK",
//   "profession": "Dev",
//   "email": "khanhleemtp@gmail.com",
//   "images": "https://assets.topdev.vn/Resume/2021/06/20/66711/avatar/41fd96a0-d18d-11eb-90e3-f1bf4a9680a3.png",
//   "phone": "0123456789",
//   "gender": "male",
//   "dateofbirth": "1998-10-08",
//   "provinces_id": "01",
//   "address": "Minh Khai",
//   "linkedin": "abc",
//   "github": "khanhleemtp",
//   "extra_skills": "koko",
//   "province_name": "Thành phố Hà Nội"
// }

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Bạn cần nhập tên').min(4, 'Cần 4 ký tự'),
    age: yup.number().typeError('Bạn cần nhập số'),
  })
  .required();

export default function EditCv() {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  console.log('Errors: ', errors);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 m-4 max-w-sm flex flex-col p-6 rounded-xl bg-white"
      >
        <input
          name="name"
          type="text"
          className="input-rounded"
          placeholder="Lê Đình Khánh"
          {...register('name')}
          // className="my-4 border-2 p-2 rounded-md"
        />
        <input
          name="age"
          type="text"
          label="age"
          placeholder="12"
          {...register('age')}
          className="input-rounded"
        />
        <input
          type="text"
          name="email"
          label="Email"
          placeholder="khanhleemtp@gmail.com"
          {...register('email')}
          className="input-rounded"
        />
        <button
          className="text-white bg-blue-300 ring-1 ring-indigo-300 rounded-2xl py-2"
          type="submit"
        >
          {isSubmitting ? 'Loading' : 'Submit'}
        </button>
      </form>
    </FormProvider>
  );
}
