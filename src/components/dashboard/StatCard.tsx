import { EllipsisVertical } from "lucide-react";
import type { FC, ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  variant?: "default" | "primary";
  className?: string;
};

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = "default",

  className = "",
}) => {
  const isPrimary = variant === "primary";
  return (
    <div
      className={`rounded-xl border pb-10 ${
        isPrimary ? "bg-primary text-white border-primary" : "bg-white"
      } p-3 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className={` rounded-full p-2 ${
              isPrimary ? "bg-white" : "bg-gray-100 shrink-0"
            }`}
          >
            {icon}
          </div>

          <div
            className={`text-xl ${isPrimary ? "text-white/90" : "text-black"}`}
          >
            {title}
          </div>
        </div>
        <div className="hover:bg-gray-200 p-1 rounded-full">
          <EllipsisVertical />
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="text-3xl font-semibold mt-2">{value}</div>
        {subtitle && (
          <div
            className={`text-xs mt-1 ${
              isPrimary ? "text-white/80" : "text-gray-500"
            }`}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
