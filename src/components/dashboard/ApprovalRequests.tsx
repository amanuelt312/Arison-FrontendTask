import type { FC } from "react";
import { MoreHorizontal } from "lucide-react";

type ApprovalItem = {
  id: string;
  name: string;
  vehicleType: string;
  date: string; // e.g. 04/17/23 at 8:25 PM
  avatarUrl: string;
};

const items: ApprovalItem[] = [
  {
    id: "1",
    name: "Nesredin Haji",
    vehicleType: "XL Van",
    date: "04/17/23 at 8:25 PM",
    avatarUrl: "https://i.pravatar.cc/48?img=5",
  },
  {
    id: "2",
    name: "Nesredin Haji",
    vehicleType: "Boda Boda",
    date: "04/17/23 at 8:25 PM",
    avatarUrl: "https://i.pravatar.cc/48?img=6",
  },
  {
    id: "3",
    name: "Nesredin Haji",
    vehicleType: "Economy",
    date: "04/17/23 at 8:25 PM",
    avatarUrl: "https://i.pravatar.cc/48?img=7",
  },
  {
    id: "4",
    name: "Nesredin Haji",
    vehicleType: "Delivery",
    date: "04/17/23 at 8:25 PM",
    avatarUrl: "https://i.pravatar.cc/48?img=8",
  },
];

export const ApprovalRequests: FC = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Approval Requests</h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border p-4 flex items-center gap-3"
          >
            <img
              src={item.avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">{item.date}</div>
            </div>
            <div className="text-sm text-gray-700">{item.vehicleType}</div>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApprovalRequests;
