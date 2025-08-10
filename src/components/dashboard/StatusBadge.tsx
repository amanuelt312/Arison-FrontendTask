import type { FC } from "react";

export type DriverStatus = "Available" | "Offline" | "Suspended";

export const StatusBadge: FC<{ status: DriverStatus }> = ({ status }) => {
  const styles: Record<DriverStatus, string> = {
    Available: "bg-success/10 text-success border-success/30",
    Offline: "bg-gray-100 text-gray-600 border-gray-200",
    Suspended: "bg-danger/10 text-danger border-danger/30",
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
