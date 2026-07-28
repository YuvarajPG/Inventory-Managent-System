import { ChangeEventHandler } from "react";

interface Props {
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  text: string;
  type?: string;
  placeholder?: string;
}
const Input = ({
  text,
  value,
  onChange,
  type = "text",
  placeholder = "placeholder",
}: Props) => {
  return (
    <div>
      <label htmlFor={text}>{text}</label>

      <input
        id={text}
        className="rounded-xl border-2 border-gray-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
export default Input;
