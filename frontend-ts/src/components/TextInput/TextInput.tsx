import React, { FunctionComponent } from "react";
import { InputField } from "./TextInputAtoms";

interface TextInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
}
const TextInput: FunctionComponent<TextInputProps> = ({
  onChange,
  placeholder = "",
  onKeyUp,
  value,
}) => {
  return (
    <InputField
      value={value}
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
    />
  );
};

export default TextInput;
