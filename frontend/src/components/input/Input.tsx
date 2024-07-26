import { ChangeEvent } from "react";

import "./Input.css";

interface InputProps {
  label?: string;
  name: string;
  type: string;
  required: boolean;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  checked?: boolean;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  required,
  value,
  onChange,
  placeholder,
  min,
  max,
  checked
}) => (
  <label className="input">
    {label && <span className="input__heading">{label}</span>}
    <input
      name={name}
      type={type}
      required={required}
      value={min ? Number(value).toString() : value}
      onChange={onChange}
      autoComplete={type === "password" ? "new-password" : "off"}
      placeholder={placeholder}
      min={min}
      max={max}
      checked={checked}
    />
  </label>
);

export default Input;
