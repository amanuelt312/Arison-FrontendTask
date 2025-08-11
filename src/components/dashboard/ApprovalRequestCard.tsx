import { MoreVerticalIcon } from "lucide-react";
import type { FC } from "react";

export type ApprovalItem = {
  id: string;
  name: string;
  vehicleType: string;
  date: string; // e.g. 04/17/23 at 8:25 PM
  avatarUrl: string;
};

export const ApprovalRequestsCard: FC<ApprovalItem> = ({
  id,
  avatarUrl,
  name,
  vehicleType,
  date,
}) => {
  return (
    <div
      key={id}
      className="bg-white rounded-2xl border p-3 flex items-center gap-3"
    >
      <div className="flex justify-center items-center w-11 h-11 border-2 border-gray-400 rounded-full">
        <img src={avatarUrl} alt="avatar" className="w-9 h-9 rounded-full" />
      </div>
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-gray-500">{date}</div>
      </div>
      <div className="text-sm text-gray-700">{vehicleType}</div>
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <MoreVerticalIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
