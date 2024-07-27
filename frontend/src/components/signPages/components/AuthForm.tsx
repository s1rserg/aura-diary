import { FormEvent } from 'react';

interface AuthFormProps {
  className: string;
  titleClassName: string;
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({
  className,
  titleClassName,
  title,
  onSubmit,
  children,
}) => {
  const formClassName = `${title.toLowerCase()}-form${
    className ? ` ${className}` : ''
  }`;

  return (
    <form className={formClassName} onSubmit={onSubmit} autoComplete="off">
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </form>
  );
};

export default AuthForm;
