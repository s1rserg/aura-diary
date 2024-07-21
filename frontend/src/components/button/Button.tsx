import "./Button.css"

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  testId,
  children, 
  className = '',
  type = 'button',
  ...rest 
}) => {
  return (
    <button
      data-test-id={testId}
      className={className}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;