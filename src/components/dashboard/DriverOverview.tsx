import type { FC } from "react";
import { Car, Users, MapPin, UserPlus } from "lucide-react";
import { StatCard } from "./StatCard";

const stats = {
  totalDrivers: 2200,
  onlineDrivers: 320,
  tripsInProgress: 76,
  newSignupsToday: 17,
};

export const DriverOverview: FC = () => {
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
          value={stats.totalDrivers.toLocaleString()}
          subtitle={"+12%"}
          variant="primary"
          icon={<Car className="w-8 h-8 text-primary" />}
        />
        <StatCard
          className="col-span-1"
          title="Online Drivers"
          value={`${stats.onlineDrivers} Drivers`}
          icon={<Users className="w-6 h-6 text-primary" />}
        />
        <StatCard
          className="col-span-1"
          title="Trips in Progress"
          value={stats.tripsInProgress}
          icon={<MapPin className="w-6 h-6 text-primary" />}
        />
        <StatCard
          className="col-span-1"
          title={"Today's New Sign-ups"}
          value={stats.newSignupsToday}
          icon={<UserPlus className="w-6 h-6 text-primary" />}
        />
      </div>
    </section>
  );
};

export default DriverOverview;
