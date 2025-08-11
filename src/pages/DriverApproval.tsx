import type { FC } from "react";
import AppLayout from "../components/layout/AppLayout";
import { useParams, useNavigate } from "react-router-dom";
import {
  ApprovalRequestsCard,
  type ApprovalItem,
} from "../components/dashboard/ApprovalRequestCard";
import {
  Car,
  CheckCircle2,
  CircleX,
  FileText,
  FileArchive,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  CalendarClock,
  Trash,
} from "lucide-react";

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
  {
    id: "5",
    name: "Nesredin Haji",
    vehicleType: "Delivery",
    date: "04/17/23 at 8:25 PM",
    avatarUrl: "https://i.pravatar.cc/48?img=9",
  },
];

const FileCard: FC<{
  name: string;
  size: string;
  date: string;
  type: "pdf" | "zip";
  passed?: boolean;
}> = ({ name, size, date, type, passed = true }) => {
  const Icon = type === "pdf" ? FileText : FileArchive;
  return (
    <div className="items-center gap-3 bg-white rounded-xl border border-gray-300 shadow px-3 py-2">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          type === "pdf" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-[11px] text-gray-500">
          {size} • {date}
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        <CheckCircle2 className="w-4 h-4 text-green-600 cursor-pointer" />

        <CircleX className="w-4 h-4 text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};

const LabelRow: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className=" items-start gap-2">
    <div className="text-xs text-gray-500 w-40">{label}</div>
    <div className="text-sm text-black font-semibold">{value}</div>
  </div>
);

const DriverApproval: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedId = id ?? items[0].id;

  return (
    <AppLayout>
      <div className="max-w-[1200px] mx-auto">
        <div className="my-5">
          <h2 className="text-2xl font-semibold">User Management</h2>
          <h3 className="text-gray-400">Drivers / Driver Approval</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Approval Requests */}
          <section className="lg:col-span-1">
            <div className="bg-white rounded-2xl  p-4">
              <div className="mb-5">
                <h3 className="text-lg font-semibold">Approval Requests</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Manage your markets location and other informations.
                </p>
              </div>
              <div className="space-y-3 ">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`${
                      selectedId === item.id ? "ring-1 ring-primary" : ""
                    } rounded-2xl`}
                  >
                    <ApprovalRequestsCard
                      {...item}
                      onClick={() => navigate(`/driver-approval/${item.id}`)}
                      showMore={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right: Contact Details + Documents */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-300 shadow">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-5 border-b border-bordercolor">
                <h3 className="text-lg font-semibold text-gray-500">
                  Contact Details
                </h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">
                    Approve
                  </button>
                  <button className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm">
                    Decline
                  </button>
                  <button className="p-2 rounded-md hover:bg-gray-100">
                    <Trash className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Identity Header */}
              <div className="px-4 py-4 flex items-center gap-3">
                <img
                  src={`https://i.pravatar.cc/72?img=12`}
                  alt="avatar"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <div className="font-semibold">Nesredin Haji</div>
                  <div className="text-sm text-gray-500 ">XL Van</div>
                  <div className=" text-sm text-gray-500 ">
                    04/17/23 at 8:25 PM
                  </div>
                </div>
              </div>

              {/* Contact Grid */}
              <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                <div className="space-y-3">
                  <LabelRow label="Phone number" value="+1 (203) 3548" />
                  <LabelRow
                    label="Address"
                    value="312, Imperical Arc, New western corner"
                  />
                  <LabelRow label="City" value="New York" />
                </div>
                <div className="space-y-3">
                  <LabelRow
                    label="Email address"
                    value="nesrilbaba@gmail.com"
                  />
                  <LabelRow label="Country" value="United Stats" />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 mt-3" />

              {/* Documents Sections */}
              <div className="p-4 space-y-6 mt-3">
                <div>
                  <div className="text-sm font-semibold mb-3">
                    Passport/National ID
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FileCard
                      name="Front.pdf"
                      size="2 MB"
                      date="2 Dec 2022"
                      type="pdf"
                      passed
                    />
                    <FileCard
                      name="Back.zip"
                      size="2 MB"
                      date="2 Dec 2022"
                      type="zip"
                      passed={false}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-3">
                    Driving License
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FileCard
                      name="Front.pdf"
                      size="2 MB"
                      date="2 Dec 2022"
                      type="pdf"
                      passed
                    />
                    <FileCard
                      name="Back.zip"
                      size="2 MB"
                      date="2 Dec 2022"
                      type="zip"
                      passed={false}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-3">
                    Vehicle Information
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FileCard
                      name="Vehicle Registration.pdf"
                      size="2 MB"
                      date="2 Dec 2022"
                      type="pdf"
                      passed
                    />
                    <FileCard
                      name="Vehicle Insurance.pdf"
                      size="2 MB"
                      date="2 Dec 2022"
                      type="pdf"
                      passed={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default DriverApproval;
