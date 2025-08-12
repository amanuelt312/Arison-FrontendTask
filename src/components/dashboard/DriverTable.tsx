import type { FC } from "react";
import { useMemo, useState } from "react";
import { SearchInput } from "../ui/SearchInput";
import { Header } from "../ui/Header";
import {
  Ban,
  CheckCircle,
  FileUp,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Loader2,
} from "lucide-react";
import { StatusBadge, type DriverStatus } from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import SuspensionModal from "./SuspensionModal";
import ActivateModal from "./ActivateModal";
import { useDrivers } from "../../hooks/useDrivers";
import { useServices } from "../../hooks/useServices";
import { useSuspendUser, useActivateUser } from "../../hooks/useDriverActions";
import { resolveMediaUrl, PLACEHOLDER_IMAGE } from "../../config/images";

export type Driver = {
  id: string;
  name: string;
  phone: string;
  carType: string;
  dateCreated: string;
  status: string;
  avatarUrl: string;
};

export const DriverTable: FC = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<{ key: string; label: string }>({
    key: "all",
    label: "All Drivers",
  });
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [selectedDriverName, setSelectedDriverName] = useState<string>("");
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const navigate = useNavigate();

  const servicesQuery = useServices();

  const serviceIdToName = useMemo(() => {
    const map = new Map<string, string>();
    servicesQuery.data?.forEach((s) => map.set(s._id, s.name));
    return map;
  }, [servicesQuery.data]);

  const tabs = useMemo(() => {
    const base = [{ key: "all", label: "All Drivers" }];
    const services =
      servicesQuery.data?.map((s) => ({ key: s._id, label: s.name })) ?? [];
    return [...base, ...services];
  }, [servicesQuery.data]);

  const { data, isLoading, isError, error } = useDrivers({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: sortDirection,
    serviceLevelId: activeTab.key === "all" ? undefined : activeTab.key,
    search: query,
  });

  const suspendMutation = useSuspendUser();
  const activateMutation = useActivateUser();

  const handleSort = (field: string) => {
    if (field !== "dateCreated") return; // only server-sort by createdAt
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleRowClick = (id: string) => {
    navigate(`/drivers/${id}`);
  };

  const openSuspend = (id: string, name: string) => {
    setSelectedDriverId(id);
    setSelectedDriverName(name);
    setSuspendOpen(true);
  };

  const openActivate = (id: string, name: string) => {
    setSelectedDriverId(id);
    setSelectedDriverName(name);
    setActivateOpen(true);
  };

  const users = data?.users ?? [];
  const pagination = data?.pagination;

  // Map backend to UI rows
  const rows: Driver[] = users.map((u) => {
    const primaryServiceId =
      Array.isArray(u.serviceType) && u.serviceType.length > 0
        ? String(u.serviceType[0])
        : undefined;
    const carType = primaryServiceId
      ? serviceIdToName.get(primaryServiceId) || primaryServiceId
      : u.vehicleDetails && "vehicleModel" in (u.vehicleDetails || {})
      ? String((u.vehicleDetails as any)?.vehicleModel || "-")
      : "-";

    const avatar = resolveMediaUrl((u as any).profilePicture);

    return {
      id: u._id,
      name: u.fullName || "-",
      phone: u.mobileNumber || "-",
      carType,
      dateCreated: new Date(u.createdAt).toLocaleString(),
      status: u.status || "active",
      avatarUrl: avatar || PLACEHOLDER_IMAGE,
    };
  });

  // Client-side search across id/name/phone
  const filtered = rows.filter((d) => {
    const inQuery = `${d.id} ${d.name} ${d.phone}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return inQuery;
  });

  const isFirstPage = !pagination?.hasPrev;
  const isLastPage = !pagination?.hasNext;

  return (
    <section className="mt-6">
      <div className="bg-white rounded-2xl border border-gray-300 shadow p-4">
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
          <div className="flex items-center justify-between w-full border border-gray-300 shadow rounded-xl px-2 py-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setActiveTab(t);
                  setPage(1);
                }}
                className={`text-sm font-bold px-2 py-1 rounded-2xl cursor-pointer ${
                  activeTab.key === t.key
                    ? "bg-primary/10 text-primary"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-auto">
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">
              Loading drivers...
            </div>
          ) : isError ? (
            <div className="py-8 text-center text-danger">
              {(error as Error)?.message || "Failed to load"}
            </div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr className="text-left text-gray-500">
                    <th className="py-3 px-2 w-10 rounded-tl-xl">
                      <input type="checkbox" />
                    </th>
                    <Header label="Driver Id & Name" sortable={false} />
                    <Header label="Phone Number" sortable={false} />
                    <Header label="Car Type" sortable={false} />
                    <Header
                      label="Date Created"
                      sortable
                      isActive={sortField === "dateCreated"}
                      onClick={() => handleSort("dateCreated")}
                    />
                    <Header label="Status" sortable={false} />
                    <Header
                      label="Action"
                      sortable={false}
                      className="rounded-tr-xl"
                    />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr
                      key={d.id}
                      className="text-gray-500 hover:bg-gray-50 group"
                    >
                      <td className="py-3 px-2">
                        <input type="checkbox" />
                      </td>
                      <td
                        className="py-3 px-2  "
                        onClick={() => handleRowClick(d.id)}
                      >
                        <div className="flex  items-center gap-3">
                          <img
                            src={d.avatarUrl || PLACEHOLDER_IMAGE}
                            alt="avatar"
                            className="w-9 h-9 rounded-md object-cover"
                          />
                          <div className="">
                            <div className="text-xs text-primary">{d.id}</div>
                            <div className="">{d.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 ">{d.phone}</td>
                      <td className="py-3 px-2">{d.carType}</td>
                      <td className="py-3 px-2">{d.dateCreated}</td>
                      <td className="py-3 px-2">
                        <StatusBadge status={d.status as DriverStatus} />
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          {updatingId === d.id &&
                          (suspendMutation.isPending ||
                            activateMutation.isPending) ? (
                            <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                          ) : d.status === "active" ? (
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                              title="Suspend"
                              onClick={() => openSuspend(d.id, d.name)}
                              disabled={!!updatingId}
                            >
                              <Ban className="w-4 h-4 text-gray-500" />
                            </button>
                          ) : (
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                              title="Activate"
                              onClick={() => openActivate(d.id, d.name)}
                              disabled={!!updatingId}
                            >
                              <CheckCircle className="w-4 h-4 text-gray-500" />
                            </button>
                          )}
                          <Trash2 className="w-4 h-4 text-gray-500" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                <div>
                  <span className="text-black">
                    {pagination?.currentPage ?? 1}
                  </span>{" "}
                  of {pagination?.totalPages ?? 1} Pages
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select
                      className="border rounded-lg p-1"
                      value={limit}
                      onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 border rounded-lg"
                      disabled={isFirstPage}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft
                        className={`h-4 w-4 ${
                          isFirstPage ? "text-gray-300" : "text-black"
                        }`}
                      />
                    </button>
                    <button
                      className="p-1 border rounded-lg"
                      disabled={isLastPage}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      <ChevronRight
                        className={`h-4 w-4 ${
                          isLastPage ? "text-gray-300" : "text-black"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <SuspensionModal
        open={suspendOpen}
        onClose={() => setSuspendOpen(false)}
        driverName={selectedDriverName}
        onSubmit={(payload) => {
          // duration: days or from date; default to 1 day if none
          const now = Date.now();
          let durationDays = payload.days ?? 1;
          if (!payload.days && payload.date) {
            const target = new Date(payload.date).getTime();
            durationDays = Math.max(
              0.01,
              (target - now) / (1000 * 60 * 60 * 24)
            );
          }
          setUpdatingId(selectedDriverId);
          suspendMutation.mutate(
            {
              userId: selectedDriverId,
              reason: payload.reason || "Suspended by admin",
              duration: durationDays,
              suspensionType: payload.type,
            },
            {
              onSettled: () => {
                setUpdatingId(null);
                setSuspendOpen(false);
              },
            }
          );
        }}
      />
      <ActivateModal
        open={activateOpen}
        onClose={() => setActivateOpen(false)}
        onSubmit={(reason) => {
          setUpdatingId(selectedDriverId);
          activateMutation.mutate(
            {
              userId: selectedDriverId,
              reason: reason || "Issue resolved after investigation",
            },
            {
              onSettled: () => {
                setUpdatingId(null);
                setActivateOpen(false);
              },
            }
          );
        }}
      />
    </section>
  );
};

export default DriverTable;
