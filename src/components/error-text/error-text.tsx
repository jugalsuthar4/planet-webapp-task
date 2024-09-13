import React from 'react';

type ErrorTextProps = {
  error: string;
  key?: string;
};

const ErrorText = ({ error }: ErrorTextProps) => {
  return <p className="text-red-400 text-xs">{error}</p>;
};

export default ErrorText;
