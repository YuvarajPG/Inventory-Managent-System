import { ChangeEventHandler } from "react";
import { Captialize } from "../../util/Captialize";

interface Props {
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  text: string;
  type?: string;
  placeholder?: string;
  className?: string;
}
const Input = ({
  text,
  value,
  onChange,
  type = "text",
  placeholder = "placeholder",
  className,
}: Props) => {
  return (
    <div>
      <label htmlFor={text}>{Captialize(text)}</label>

      <input
        id={text}
        className={`${className} rounded-xl border-2 border-gray-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={Captialize(placeholder)}
      />
    </div>
  );
};
export default Input;
