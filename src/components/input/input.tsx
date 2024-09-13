import React from 'react';
import Label from '../label/label';
import { ICommonProps } from '@/interface/ICommonProps';

type InputFieldType = 'email' | 'text' | 'number' | 'password' | 'date';

export type InputProps = ICommonProps & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: InputFieldType;
  otherProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const Input = ({
  value,
  className,
  testId,
  id,
  style,
  type,
  name,
  placeholder,
  isRequired = false,
  onChange,
  label = '',
  otherProps,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} value={label} isRequired={true} />
      <input
        type={type}
        className={`border-[1px] border-black rounded-md w-full p-2 ${className}`}
        id={id}
        data-testid={testId}
        style={style}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={isRequired}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
