import type { FC } from "react";
import { MoveRight } from "lucide-react";
import { ApprovalRequestsCard, type ApprovalItem } from "./ApprovalRequestCard";

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
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Approval Requests</h3>
        <div className="flex items-center justify-between">
          <h3 className="  text-gray-400">
            Manage your markets location and other informations.
          </h3>
          <div className="bg-gray-100 rounded-lg px-1 hover:bg-gray-200 cursor-pointer">
            <MoveRight className="text-gray-500 w-4" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <ApprovalRequestsCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ApprovalRequests;
