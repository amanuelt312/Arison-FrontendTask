import type { FC } from "react";
import AppLayout from "../components/layout/AppLayout";
import { useParams, useNavigate } from "react-router-dom";
import { ApprovalRequestsCard } from "../components/dashboard/ApprovalRequestCard";
import {
  CheckCircle2,
  CircleX,
  FileText,
  FileArchive,
  Trash,
  UserPlus,
} from "lucide-react";
import {
  usePendingDrivers,
  type PendingDriver,
} from "../hooks/usePendingDrivers";
import { useApproveDriver, useRejectDriver } from "../hooks/useDriverActions";
import { resolveMediaUrl, PLACEHOLDER_IMAGE } from "../config/images";
import Loading from "../components/ui/Loading";
import EmptyState from "../components/ui/EmptyState";

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

const FileCard: FC<{
  name: string;
  date?: string;
  url?: string;
}> = ({ name, date }) => {
  const isPdf = name.toLowerCase().endsWith(".pdf");
  const Icon = isPdf ? FileText : FileArchive;
  return (
    <div className="items-center gap-3 bg-white rounded-xl border border-gray-300 shadow px-3 py-2">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isPdf ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium break-all">{name}</div>
        {date && <div className="text-[11px] text-gray-500">{date}</div>}
      </div>
      <div className="flex gap-2 mt-1">
        <CheckCircle2 className="w-4 h-4 text-green-600 cursor-pointer" />
        <CircleX className="w-4 h-4 text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};

const LabelRow: FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className=" items-start gap-2">
    <div className="text-xs text-gray-500 w-40">{label}</div>
    <div className="text-sm text-black font-semibold">{value || "—"}</div>
  </div>
);

function docNameFromUrl(url: string): string {
  try {
    const u = new URL(url, window.location.origin);
    return u.pathname.split("/").pop() || url;
  } catch {
    return url;
  }
}

function groupDocuments(driver?: PendingDriver) {
  const docs = driver?.driverProfile?.onboardingDocuments || [];
  const byType: Record<string, string[]> = {
    idCard: [],
    driverLicense: [],
    vehicle: [],
  };

  for (const d of docs) {
    if (!d.url) continue;
    if (d.type === "idCard") byType.idCard.push(d.url);
    else if (d.type === "driverLicenseFront" || d.type === "driverLicenseBack")
      byType.driverLicense.push(d.url);
    else if (
      d.type === "vehicleRegistration" ||
      d.type === "vehicleInsurance" ||
      d.type === "inspectionCertificate"
    )
      byType.vehicle.push(d.url);
  }

  return byType;
}

const DriverApproval: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = usePendingDrivers({ page: 1, limit: 20 });
  const approveMutation = useApproveDriver();
  const rejectMutation = useRejectDriver();

  const drivers = data?.drivers ?? [];
  const selectedDriver = id ? drivers.find((d) => d._id === id) : undefined;

  const handleApprove = async () => {
    if (!id) return;
    await approveMutation.mutateAsync({ driverId: id });
    // After approving, the driver should disappear from pending; navigate back to list
    navigate("/driver-approval");
  };

  const handleReject = async () => {
    if (!id) return;
    await rejectMutation.mutateAsync({ driverId: id });
    navigate("/driver-approval");
  };

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
                {isLoading && <Loading title="Loading…" size="sm" />}
                {!isLoading && drivers.length === 0 && (
                  <EmptyState
                    icon={<UserPlus className="w-6 h-6" />}
                    title="No pending requests"
                  />
                )}
                {!isLoading &&
                  drivers.map((item) => (
                    <div
                      key={item._id}
                      className={`${
                        id === item._id ? "ring-1 ring-primary" : ""
                      } rounded-2xl`}
                    >
                      <ApprovalRequestsCard
                        id={item._id}
                        name={item.fullName || "Unknown"}
                        vehicleType={
                          item.driverProfile?.vehicleDetails?.vehicleModel ||
                          "—"
                        }
                        date={formatDateTime(item.createdAt)}
                        avatarUrl={
                          resolveMediaUrl(item.profilePicture) ||
                          PLACEHOLDER_IMAGE
                        }
                        onClick={() => navigate(`/driver-approval/${item._id}`)}
                        showMore={false}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Right: Contact Details + Documents */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-300 shadow min-h-[300px]">
              {!id || !selectedDriver ? (
                <div className="flex items-center justify-center h-[300px] text-gray-500">
                  Select an approval request to view details
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-5 border-b border-bordercolor">
                    <h3 className="text-lg font-semibold text-gray-500">
                      Contact Details
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
                        disabled={
                          approveMutation.isPending || rejectMutation.isPending
                        }
                        onClick={handleApprove}
                      >
                        {approveMutation.isPending ? "Approving…" : "Approve"}
                      </button>
                      <button
                        className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm disabled:opacity-50"
                        disabled={
                          approveMutation.isPending || rejectMutation.isPending
                        }
                        onClick={handleReject}
                      >
                        {rejectMutation.isPending ? "Declining…" : "Decline"}
                      </button>
                      <button className="p-2 rounded-md hover:bg-gray-100">
                        <Trash className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Identity Header */}
                  <div className="px-4 py-4 flex items-center gap-3">
                    <img
                      src={
                        resolveMediaUrl(selectedDriver.profilePicture) ||
                        PLACEHOLDER_IMAGE
                      }
                      alt="avatar"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">
                        {selectedDriver.fullName}
                      </div>
                      <div className="text-sm text-gray-500 ">
                        {selectedDriver.driverProfile?.vehicleDetails
                          ?.vehicleModel || "—"}
                      </div>
                      <div className=" text-sm text-gray-500 ">
                        {formatDateTime(selectedDriver.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Contact Grid */}
                  <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                    <div className="space-y-3">
                      <LabelRow
                        label="Phone number"
                        value={selectedDriver.phone}
                      />
                      <LabelRow label="Address" value={"—"} />
                      <LabelRow label="City" value={"—"} />
                    </div>
                    <div className="space-y-3">
                      <LabelRow
                        label="Email address"
                        value={selectedDriver.email}
                      />
                      <LabelRow label="Country" value={"—"} />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 mt-3" />

                  {/* Documents Sections */}
                  <div className="p-4 space-y-6 mt-3">
                    {(() => {
                      const grouped = groupDocuments(selectedDriver);
                      return (
                        <>
                          <div>
                            <div className="text-sm font-semibold mb-3">
                              Passport/National ID
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {grouped.idCard.length === 0 ? (
                                <div className="text-xs text-gray-400">
                                  No documents
                                </div>
                              ) : (
                                grouped.idCard.map((u) => (
                                  <FileCard key={u} name={docNameFromUrl(u)} />
                                ))
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-semibold mb-3">
                              Driving License
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {grouped.driverLicense.length === 0 ? (
                                <div className="text-xs text-gray-400">
                                  No documents
                                </div>
                              ) : (
                                grouped.driverLicense.map((u) => (
                                  <FileCard key={u} name={docNameFromUrl(u)} />
                                ))
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-semibold mb-3">
                              Vehicle Information
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {grouped.vehicle.length === 0 ? (
                                <div className="text-xs text-gray-400">
                                  No documents
                                </div>
                              ) : (
                                grouped.vehicle.map((u) => (
                                  <FileCard key={u} name={docNameFromUrl(u)} />
                                ))
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default DriverApproval;
