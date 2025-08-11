import type { FC } from "react";
import { ChevronsUpDown } from "lucide-react";

interface HeaderProps {
  label: string;
  sortable?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Header: FC<HeaderProps> = ({
  label,
  sortable = false,
  isActive = false,
  onClick,
  className = "",
}) => {
  return (
    <th className={`py-3 px-2 ${className}`}>
      {sortable ? (
        <div
          className={`flex items-center justify-between cursor-pointer font-medium ${
            onClick ? "hover:text-primary" : ""
          }`}
          onClick={onClick}
        >
          <span className={`${isActive ? "text-primary" : "text-gray-500"}`}>
            {label}
          </span>
          <ChevronsUpDown
            className={`w-4 h-4 transition-colors ${
              isActive ? "text-primary" : "text-gray-400"
            }`}
          />
        </div>
      ) : (
        <div className="font-medium">{label}</div>
      )}
    </th>
  );
};
