import React from 'react';
import Label from '../label/label';
import { ICommonProps } from '@/interface/ICommonProps';

export type DropdownProps = ICommonProps & {
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({
  className = '',
  id = '',
  name,
  options,
  placeholder,
  value,
  style = {},
  onChange,
  isRequired,
  label,
}: DropdownProps) => {
  return (
    <>
      <Label htmlFor={id} value={label} />
      <select
        name={name}
        id={id}
        value={value}
        className={`border-[1px] border-black rounded-md w-full p-2.5 ${className}`}
        style={style}
        onChange={onChange}
        required={isRequired}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt, idx) => {
          return (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Dropdown;
