import { ChangeEventHandler } from "react";
import { Captialize } from "../../util/Captialize";

interface Props {
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  text: string;
  type?: string;
  placeholder?: string;
  className?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}
const Input = ({
  text,
  value,
  onChange,
  type = "text",
  placeholder = "placeholder",
  className,
  inputMode,
}: Props) => {
  return (
    <div>
      <label htmlFor={text}>{Captialize(text)}</label>
      <input
        id={text}
        className={`${className} ms-2 rounded-xl border-2 border-gray-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 max-w-40`}
        type={type}
        value={value}
        onChange={onChange}
        min={0}
        // "numeric"
        inputMode={inputMode}
        placeholder={Captialize(placeholder)}
      />
    </div>
  );
};
export default Input;
