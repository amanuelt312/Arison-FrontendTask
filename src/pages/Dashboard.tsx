import type { FC } from "react";
import AppLayout from "../components/layout/AppLayout";
import DriverOverview from "../components/dashboard/DriverOverview";
import ApprovalRequests from "../components/dashboard/ApprovalRequests";
import DriverTable from "../components/dashboard/DriverTable";

const Dashboard: FC = () => {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DriverOverview />
          </div>
          <div className="lg:col-span-1">
            <ApprovalRequests />
          </div>
        </div>

        <DriverTable />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
