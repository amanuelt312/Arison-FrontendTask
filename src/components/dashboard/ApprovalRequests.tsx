import type { FC } from "react";
import { MoveRight } from "lucide-react";
import { ApprovalRequestsCard } from "./ApprovalRequestCard";
import { useNavigate } from "react-router-dom";
import { usePendingDrivers } from "../../hooks/usePendingDrivers";
import { resolveMediaUrl, PLACEHOLDER_IMAGE } from "../../config/images";
import Loading from "../ui/Loading";

function formatDateTime(value: string): string {
  const d = new Date(value);
  return d.toLocaleString(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  });
}

export const ApprovalRequests: FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = usePendingDrivers({ page: 1, limit: 20 });

  const drivers = data?.drivers ?? [];

  return (
    <section>
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Approval Requests</h3>
        <div className="flex items-center justify-between">
          <h3 className="  text-gray-400">
            Manage your markets location and other informations.
          </h3>
          <div
            className="bg-gray-100 rounded-lg px-1 hover:bg-gray-200 cursor-pointer"
            onClick={() => navigate("/driver-approval")}
          >
            <MoveRight className="text-gray-500 w-4" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {isLoading && <Loading title="Loading pending requests…" size="sm" />}
        {!isLoading && drivers.length === 0 && (
          <div className="text-sm text-gray-400">No pending requests</div>
        )}
        {!isLoading &&
          drivers.map((d) => (
            <ApprovalRequestsCard
              key={d._id}
              id={d._id}
              name={d.fullName || "Unknown"}
              vehicleType={d.driverProfile?.vehicleDetails?.vehicleModel || "—"}
              date={formatDateTime(d.createdAt)}
              avatarUrl={resolveMediaUrl(d.profilePicture) || PLACEHOLDER_IMAGE}
              onClick={() => navigate(`/driver-approval/${d._id}`)}
            />
          ))}
      </div>
    </section>
  );
};

export default ApprovalRequests;
