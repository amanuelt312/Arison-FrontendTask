import type { FC, ReactNode } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  endIcon?: ReactNode;
}
export const Input: FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  endIcon,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={
            "w-full focus:outline-primary border border-gray-300 p-4 text-lg bg-white rounded-2xl"
          }
          id={label}
        />
        <div className="absolute right-5 top-0 bottom-0 flex items-center justify-center">
          {endIcon}
        </div>
      </div>
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
};
