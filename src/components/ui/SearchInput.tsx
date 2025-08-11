import type { FC } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const SearchInput: FC<SearchInputProps> = ({
  placeholder = "Search",
  value,
  onChange,
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  return (
    <div
      className={`flex items-center gap-2 bg-gray-100 rounded-xl ${sizeClasses[size]} ${className}`}
    >
      <input
        className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type="text"
      />
      <Search className="w-4 h-4 text-gray-500 shrink-0" />
    </div>
  );
};
