import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const InputCharka = ({ name, placeholder, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl isInvalid={errors?.[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} placeholder={placeholder} {...register(name)} />
      <FormErrorMessage>
        {errors?.[name] && errors?.[name]?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default InputCharka;

/* 
<InputCharka
name="name"
label="Họ và tên"
placeholder="Lê Đình Khánh"
errors={errors}
register={register}
/>
<InputCharka
name="profession"
label="Vị trí hiện tại/ Vị trí ứng tuyển"
placeholder="Front-end Developer"
errors={errors}
register={register}
/>
<InputCharka
name="email"
label="Email"
placeholder="khanhleemtp@gmail.com"
errors={errors}
register={register}
/> */

/* <FormControl isInvalid={errors.age}>
        <FormLabel htmlFor="age">Age</FormLabel>
        <Input id="age" placeholder="age" {...register('age')} />
        <FormErrorMessage>{errors.age && errors.age.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors['name']}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" placeholder="name" {...register('name')} />
        <FormErrorMessage>
          {errors?.['name'] && errors?.['name'].message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.profession}>
        <FormLabel htmlFor="profession">Profession</FormLabel>
        <Input
          id="profession"
          placeholder="profession"
          {...register('profession')}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl> */
