import React, { useState } from 'react';
import Input, { InputProps } from '@/components/input/input';

type PasswordInputProps = Omit<InputProps, 'type'>;

const PasswordInput = ({
  value,
  onChange,
  className,
  testId,
  id,
  style,
  placeholder,
  name,
  label,
  otherProps = {},
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className={`w-[100%] ${className}`}
        testId={testId}
        id={id}
        style={style}
        placeholder={placeholder}
        name={name}
        isRequired={true}
        otherProps={otherProps}
        label={label}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-2 top-8 flex items-center text-sm"
      >
        {showPassword ? '🙈' : '👁️'}
      </button>
    </div>
  );
};

export default PasswordInput;
