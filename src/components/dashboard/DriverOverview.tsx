import type { FC } from "react";
import { Car, Users, MapPin, UserPlus } from "lucide-react";
import { StatCard } from "./StatCard";
import { useUserSummary } from "../../hooks/useUserSummary";

export const DriverOverview: FC = () => {
  const { data: summary, isLoading } = useUserSummary();

  const totalDrivers = summary?.drivers ?? 0;
  // Backend does not provide online/trips-in-progress/new signups; set 0 for now
  const onlineDrivers = 0;
  const tripsInProgress = 0;
  const newSignupsToday = 0;

  return (
    <section>
      <div className="mb-3">
        <h2 className="text-xl font-semibold ">Drivers Overview</h2>
        <h3 className="  text-gray-400">
          Break down lengthy texts into concise summaries to grasp.
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <StatCard
          className="col-span-1"
          title="Total Drivers"
          value={(isLoading ? 0 : totalDrivers).toLocaleString()}
          subtitle={""}
          variant="primary"
          icon={<Car className="w-8 h-8 text-primary" />}
        />
        <StatCard
          className="col-span-1"
          title="Online Drivers"
          value={`${onlineDrivers} Drivers`}
          icon={<Users className="w-6 h-6 text-primary" />}
        />
        <StatCard
          className="col-span-1"
          title="Trips in Progress"
          value={tripsInProgress}
          icon={<MapPin className="w-6 h-6 text-primary" />}
        />
        <StatCard
          className="col-span-1"
          title={"Today's New Sign-ups"}
          value={newSignupsToday}
          icon={<UserPlus className="w-6 h-6 text-primary" />}
        />
      </div>
    </section>
  );
};

export default DriverOverview;
