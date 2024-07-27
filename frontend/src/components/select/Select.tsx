import React, { ChangeEvent } from 'react';
import './Select.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  onChange,
  defaultValue = '',
}) => (
  <label className="select">
    {label && <span className="input__heading">{label}</span>}
    <select name={name} onChange={onChange} defaultValue={defaultValue}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          dangerouslySetInnerHTML={{ __html: option.label }}
        />
      ))}
    </select>
  </label>
);

export default Select;
