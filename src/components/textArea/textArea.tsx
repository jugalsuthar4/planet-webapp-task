import { ICommonProps } from '@/interface/ICommonProps';
import React from 'react';
import Label from '../label/label';

type TextAreaProps = ICommonProps & {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
  disabled?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  rows = 4,
  cols = 50,
  className = '',
  style = {},
  isRequired = false,
  disabled = false,
  label,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} value={label} isRequired={true} />
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        onChange={onChange}
        className={`border-[1px] border-black rounded-md p-2 w-full resize-none ${className}`}
        style={style}
        required={isRequired}
        disabled={disabled}
      ></textarea>
    </div>
  );
};

export default TextArea;
