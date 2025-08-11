import type { FC } from "react";
import { useState } from "react";
import Button from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";
import { Header } from "../ui/Header";
import { Eye, Trash2, FileUp, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filtered = mockDrivers.filter((d) => {
    const inQuery = `${d.id} ${d.name} ${d.phone}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return inQuery;
  });

  const sortedDrivers = [...filtered].sort((a, b) => {
    if (!sortField) return 0;

    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case "id":
        aValue = a.id;
        bValue = b.id;
        break;
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "phone":
        aValue = a.phone;
        bValue = b.phone;
        break;
      case "carType":
        aValue = a.carType.toLowerCase();
        bValue = b.carType.toLowerCase();
        break;
      case "dateCreated":
        aValue = new Date(a.dateCreated).getTime();
        bValue = new Date(b.dateCreated).getTime();
        break;
      case "status":
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
        break;
      default:
        return 0;
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const isFirstPage = true;
  const isLastPage = false;

  return (
    <section className="mt-6">
      <div className="bg-white rounded-2xl border p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-xl">
            <SearchInput
              placeholder="Search for id, name, phone number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="lg"
            />
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-2 border border-gray-400 shadow p-2 rounded-xl cursor-pointer hover:bg-gray-100">
              <FileUp className="h-4 w-4" />
              <span className="text-sm">Export</span>
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="flex items-center justify-between w-full border rounded-xl px-2 py-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`text-sm font-bold px-2 py-1 rounded-2xl cursor-pointer ${
                  activeTab === t.key
                    ? "bg-primary/10 text-primary"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-500">
                <th className="py-3 px-2 w-10 rounded-tl-xl">
                  <input type="checkbox" />
                </th>
                <Header
                  label="Driver Id & Name"
                  sortable
                  isActive={sortField === "id"}
                  onClick={() => handleSort("id")}
                />
                <Header
                  label="Phone Number"
                  sortable
                  isActive={sortField === "phone"}
                  onClick={() => handleSort("phone")}
                />
                <Header
                  label="Car Type"
                  sortable
                  isActive={sortField === "carType"}
                  onClick={() => handleSort("carType")}
                />
                <Header
                  label="Date Created"
                  sortable
                  isActive={sortField === "dateCreated"}
                  onClick={() => handleSort("dateCreated")}
                />
                <Header
                  label="Status"
                  sortable
                  isActive={sortField === "status"}
                  onClick={() => handleSort("status")}
                />
                <th className="py-3 px-2 rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedDrivers.map((d) => (
                <tr key={d.id} className="text-gray-500">
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
                        <div className="">{d.name}</div>
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
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>

                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <div>
              <span className="text-black">1</span> of 13 Pages
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select className="border rounded-lg p-1">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 border rounded-lg">
                  <ChevronLeft
                    className={`h-4 w-4 ${
                      isFirstPage ? "text-gray-300" : "text-black"
                    }`}
                  />
                </div>
                <div className="p-1 border rounded-lg">
                  <ChevronRight
                    className={`h-4 w-4 ${
                      isLastPage ? "text-gray-300" : "text-black"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverTable;
