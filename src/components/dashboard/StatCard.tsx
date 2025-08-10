import type { FC, ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  variant?: "default" | "primary";
  footer?: ReactNode;
  className?: string;
};

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
  footer,
  className = "",
}) => {
  const isPrimary = variant === "primary";
  return (
    <div
      className={`rounded-2xl border ${
        isPrimary ? "bg-primary text-white border-primary" : "bg-white"
      } p-5 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div
            className={`text-sm ${
              isPrimary ? "text-white/90" : "text-gray-500"
            }`}
          >
            {title}
          </div>
          <div className="text-3xl font-bold mt-2">{value}</div>
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
        {icon}
      </div>
      {footer && (
        <div
          className={`mt-4 ${isPrimary ? "text-white/90" : "text-gray-600"}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default StatCard;
