import React, { useMemo } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  testId?: string;
  className?: string;
  style?: React.CSSProperties;
  id: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

const getButtonStyles = (
  variant: 'primary' | 'secondary',
  size: 'small' | 'medium' | 'large',
  disabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#515DEF',
      color: '#fff',
    },
    secondary: {
      backgroundColor: '#6c757d',
      color: '#fff',
    },
  };

  const disabledStyles: React.CSSProperties = {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
    cursor: 'not-allowed',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    small: {
      padding: '4px 8px',
      fontSize: '14px',
    },
    medium: {
      padding: '8px 16px',
      fontSize: '16px',
    },
    large: {
      padding: '12px 24px',
      fontSize: '18px',
    },
  };

  return {
    ...baseStyles,
    ...(variants[variant] || variants.primary),
    ...(sizeStyles[size] || sizeStyles.medium),
    ...(disabled ? disabledStyles : {}),
  };
};

const Button = ({
  children,
  onClick,
  className = '',
  id,
  style,
  testId,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}: ButtonProps) => {
  const buttonStyle = useMemo(
    () => getButtonStyles(variant, size, disabled),
    [variant, disabled, size]
  );

  return (
    <button
      onClick={disabled ? undefined : onClick}
      data-testid={testId}
      id={id}
      style={{ ...buttonStyle, ...style }}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
