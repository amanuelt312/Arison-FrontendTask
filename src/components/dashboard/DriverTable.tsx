import type { FC } from "react";
import { useMemo, useState } from "react";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import { Eye, Edit, Trash2 } from "lucide-react";
import { StatusBadge, type DriverStatus } from "./StatusBadge";

export type Driver = {
  id: string;
  name: string;
  phone: string;
  carType: string;
  dateCreated: string;
  status: DriverStatus;
  avatarUrl: string;
};

const mockDrivers: Driver[] = [
  {
    id: "02231",
    name: "Esmail Abdulqadr",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/17/23 at 8:25 PM",
    status: "Available",
    avatarUrl: "https://i.pravatar.cc/40?img=11",
  },
  {
    id: "02232",
    name: "Sumeya Abdushukur",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/17/23 at 8:25 PM",
    status: "Available",
    avatarUrl: "https://i.pravatar.cc/40?img=15",
  },
  {
    id: "02233",
    name: "Ziyin Abdushukur",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/17/23 at 8:25 PM",
    status: "Offline",
    avatarUrl: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: "02234",
    name: "Mensur Mohammed",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/17/23 at 8:25 PM",
    status: "Available",
    avatarUrl: "https://i.pravatar.cc/40?img=10",
  },
  {
    id: "02235",
    name: "Beigi Coffe (Navy)",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/17/23 at 8:25 PM",
    status: "Available",
    avatarUrl: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "02236",
    name: "Beigi Coffe (Navy)",
    phone: "0912873465",
    carType: "Boda Boda",
    dateCreated: "04/17/23 at 8:25 PM",
    status: "Suspended",
    avatarUrl: "https://i.pravatar.cc/40?img=9",
  },
];

const tabs = [
  { key: "all", label: "All Drivers", count: 2097 },
  { key: "economy", label: "Economy", count: 793 },
  { key: "comfort", label: "Comfort", count: 419 },
  { key: "xlvan", label: "XL Van", count: 152 },
  { key: "delivery", label: "Delivery", count: 373 },
];

export const DriverTable: FC = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = useMemo(() => {
    return mockDrivers.filter((d) => {
      const inQuery = `${d.id} ${d.name} ${d.phone}`
        .toLowerCase()
        .includes(query.toLowerCase());
      // Keeping tab behavior simple for mock
      return inQuery;
    });
  }, [query]);

  return (
    <section className="mt-6">
      <div className="bg-white rounded-2xl border p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <Input
              label="Search"
              placeholder="Search for id, name, phone number"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              error=""
            />
          </div>
          <div className="ml-auto">
            <Button size="md">Export</Button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-3 py-2 rounded-full text-sm border ${
                  activeTab === t.key
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-3 px-2 w-10">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-2">Driver Id & Name</th>
                <th className="py-3 px-2">Phone Number</th>
                <th className="py-3 px-2">Car Type</th>
                <th className="py-3 px-2">Date Created</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="py-3 px-2">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={d.avatarUrl}
                        alt="avatar"
                        className="w-9 h-9 rounded-md"
                      />
                      <div>
                        <div className="text-xs text-primary">{d.id}</div>
                        <div className="font-medium">{d.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">{d.phone}</td>
                  <td className="py-3 px-2">{d.carType}</td>
                  <td className="py-3 px-2">{d.dateCreated}</td>
                  <td className="py-3 px-2">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <div>1 - {filtered.length} of 13 Pages</div>
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select className="border rounded-lg px-2 py-1">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverTable;
