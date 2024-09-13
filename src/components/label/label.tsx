import React from 'react';

type LabelProps = {
  htmlFor: string;
  value: string;
  isRequired?: boolean;
};
const Label = ({ htmlFor, value, isRequired = false }: LabelProps) => {
  return (
    <label htmlFor={htmlFor}>
      {value} {isRequired && <span className="text-red-400">*</span>}
    </label>
  );
};

export default Label;
