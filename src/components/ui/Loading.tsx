import type { FC } from "react";

type LoadingProps = {
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  center?: boolean;
};

const sizeToSpinnerClass: Record<NonNullable<LoadingProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-4",
};

const sizeToTextClass: Record<NonNullable<LoadingProps["size"]>, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const Loading: FC<LoadingProps> = ({
  title = "Loading…",
  className = "",
  size = "md",
  center = false,
}) => {
  const containerClass = center
    ? "flex items-center justify-center py-8 text-gray-500"
    : "flex items-center text-gray-500";

  return (
    <div className={`${containerClass} ${className}`}>
      <div
        className={`animate-spin rounded-full border-gray-300 border-t-primary ${sizeToSpinnerClass[size]}`}
      />
      <span className={`${sizeToTextClass[size]} ml-2`}>{title}</span>
    </div>
  );
};

export default Loading;
