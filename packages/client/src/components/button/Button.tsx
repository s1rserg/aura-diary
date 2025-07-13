import './Button.css';

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  type = 'button',
  ...rest
}) => {
  return (
    <button className={className} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
