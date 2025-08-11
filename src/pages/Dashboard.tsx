import type { FC } from "react";
import AppLayout from "../components/layout/AppLayout";
import DriverOverview from "../components/dashboard/DriverOverview";
import ApprovalRequests from "../components/dashboard/ApprovalRequests";
import DriverTable from "../components/dashboard/DriverTable";

const Dashboard: FC = () => {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto">
        <div className="my-5">
          <h2 className="text-2xl font-semibold ">User Management</h2>
          <h3 className="  text-gray-400">Drivers</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 bg-white p-5 rounded-lg">
          <div className="lg:col-span-2 ">
            <DriverOverview />
          </div>
          <div className="lg:col-span-2">
            <ApprovalRequests />
          </div>
        </div>

        <DriverTable />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
