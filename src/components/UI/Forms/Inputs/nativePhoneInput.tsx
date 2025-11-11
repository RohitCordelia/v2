import React from 'react'
import Select from '/src/components/UI/Forms/Inputs/select';
import PhoneCode from "/src/components/UI/Forms/Inputs/phoneCodes.json";
import Input from '/src/components/UI/Forms/Inputs/input';

type Props = {
  
}

export default function NativePhoneInput({}: Props) {
  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-2">
        <Select
          options={PhoneCode}
          defaultValue={'+91'}
          selectClassName="bg-gray-400 border-0"
        />
      </div>
      <div className="col-span-4">
        <Input
          type="tel"
          placeholder="Phone"
          inputClassName="border-0 bg-gray-400"
        />
      </div>
    </div>
  );
}