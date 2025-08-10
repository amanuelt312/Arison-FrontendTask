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
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Drivers Overview</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          className="lg:col-span-2"
          title="Total Drivers"
          value={stats.totalDrivers.toLocaleString()}
          subtitle={"+12%"}
          variant="primary"
          icon={<Car className="w-8 h-8" />}
          footer={<div className="text-sm">Across all vehicle types</div>}
        />
        <StatCard
          title="Online Drivers"
          value={stats.onlineDrivers}
          icon={<Users className="w-6 h-6 text-primary" />}
        />
        <StatCard
          title="Trips in Progress"
          value={stats.tripsInProgress}
          icon={<MapPin className="w-6 h-6 text-primary" />}
        />
        <StatCard
          title={"Today's New Sign-ups"}
          value={stats.newSignupsToday}
          icon={<UserPlus className="w-6 h-6 text-primary" />}
        />
      </div>
    </section>
  );
};

export default DriverOverview;
