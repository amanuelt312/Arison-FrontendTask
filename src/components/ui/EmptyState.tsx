import type { FC, ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  className?: string;
};

export const EmptyState: FC<EmptyStateProps> = ({ icon, title, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-gray-500 py-10 ${
        className ?? ""
      }`}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
};

export default EmptyState;
