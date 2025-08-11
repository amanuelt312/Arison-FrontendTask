import type { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  delete?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  icon,
  size = "lg",
  className = "",
  delete: isDelete = false,
  loading = false,
  disabled = false,
}) => {
  const baseStyles =
    "rounded-xl text-center font-semibold flex justify-center items-center duration-300 gap-x-3 cursor-pointer";

  const sizeClass =
    size === "sm"
      ? "text-sm py-2 px-3"
      : size === "md"
      ? "text-md py-3 px-5"
      : "text-xl py-3 px-6";

  const backgroundClass = isDelete
    ? "bg-danger hover:bg-danger/80 text-white"
    : "bg-primary hover:bg-primary/80 text-white";

  return (
    <button
      className={`${baseStyles} ${sizeClass} ${backgroundClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-4 border-t-4 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
};

export default Button;
