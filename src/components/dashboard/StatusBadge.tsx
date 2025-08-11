import type { FC } from "react";

export type DriverStatus = "active" | "pending" | "suspended";

export const StatusBadge: FC<{ status: DriverStatus }> = ({ status }) => {
  const styles: Record<DriverStatus, string> = {
    active: "bg-success/10 text-green-600 border-success/30 ",
    pending: "bg-gray-100 text-gray-600 border-gray-200 ",
    suspended: "bg-danger/10 text-danger border-danger/30 ",
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
