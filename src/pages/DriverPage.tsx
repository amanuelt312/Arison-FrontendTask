import { useState, type FC } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  EllipsisVertical,
  Eye,
  Folder,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  Tags,
  User,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { StatCard, type StatCardProps } from "../components/dashboard/StatCard";
import { useDriverDetail } from "../hooks/useDriverDetail";
import { useServices } from "../hooks/useServices";
import carImage from "../assets/car.jpg";
import EmptyState from "../components/ui/EmptyState";
import { resolveMediaUrl, PLACEHOLDER_IMAGE } from "../config/images";
import Loading from "../components/ui/Loading";

const DriverPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useDriverDetail(id);
  const servicesQuery = useServices();

  const serviceIdToName = new Map<string, string>();
  servicesQuery.data?.forEach((s) => serviceIdToName.set(s._id, s.name));

  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<
    "trips" | "withdrawals" | "ratings"
  >("trips");

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-6">
          <Loading title="Loading driver..." />
        </div>
      </AppLayout>
    );
  }
  if (isError || !data) {
    return (
      <AppLayout>
        <div className="p-6 text-danger">
          {(error as Error)?.message || "Failed to load driver"}
        </div>
      </AppLayout>
    );
  }

  const user = data.user;
  const profile = data.roleSpecificData?.driverProfile;
  const documents = data.roleSpecificData?.documents ?? [];

  const driver = {
    id: user._id,
    name: user.fullName,
    email: user.email,
    phone: user.mobileNumber,
    avatar:
      resolveMediaUrl((data as any)?.user?.profilePicture) || PLACEHOLDER_IMAGE,
    country: profile?.currentLocation ? "" : "",
    userType:
      (profile?.serviceType &&
        profile.serviceType[0] &&
        serviceIdToName.get(profile.serviceType[0])) ||
      "Ride",
    stats: {
      totalTrips: data.stats?.totalTrips ?? 0,
      totalEarning: `Birr ${
        data.roleSpecificData?.earnings?.totalEarnings ?? 0
      }`,
      totalWithdrawal: `Birr ${
        data.roleSpecificData?.earnings?.totalCommission ?? 0
      }`,
      avgRating: profile?.overallRating ?? 0,
    },
    vehicle: {
      license: profile?.vehicleDetails?.licenseNumber ?? "-",
      type:
        (profile?.serviceType &&
          profile.serviceType[0] &&
          serviceIdToName.get(profile.serviceType[0])) ||
        profile?.vehicleDetails?.vehicleModel ||
        "-",
      color: profile?.vehicleDetails?.vehicleColor ?? "-",
      year: String(profile?.vehicleDetails?.ManfacturedYear ?? "-"),
    },
  };

  const stats: StatCardProps[] = [
    {
      title: "Total Trips",
      value: driver.stats.totalTrips,
      icon: <User className="w-5 h-5 text-primary" />,
      variant: "primary",
    },
    {
      title: "Total Earning",
      value: driver.stats.totalEarning,
      icon: <Tags className="w-5 h-5" />,
    },
    {
      title: "Total Withdrawal",
      value: driver.stats.totalWithdrawal,
      icon: <BriefcaseBusiness className="w-5 h-5" />,
    },
  ];

  const hasRatings = (data.roleSpecificData?.ratings?.totalRatings ?? 0) > 0;
  const hasTrips = (data.roleSpecificData?.trips?.recentTrips?.length ?? 0) > 0;
  const hasWithdrawals =
    (data.roleSpecificData?.withdrawalHistory?.length ?? 0) > 0;

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto">
        <div className="my-5">
          <h2 className="text-2xl font-semibold">User Management</h2>
          <h3 className="text-gray-400">Drivers / detail</h3>
        </div>

        {/* Top Header: Name */}
        <div className="bg-white p-4 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <div className="text-xl font-medium">{driver.name}</div>
              <div className="text-sm text-gray-500">{user.status}</div>
            </div>
            <div className="ml-auto flex items-center gap-2"></div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((item) => (
              <StatCard key={item.title} {...item} />
            ))}
            <div
              className={`rounded-xl border border-bordercolor shadow pb-10 bg-white p-3`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-2  bg-gray-100 shrink-0`}>
                    <ClipboardList className="w-5 h-5" />
                  </div>

                  <div className={`text-xl "text-black`}>Average Rating</div>
                </div>
                <div className="hover:bg-gray-200 p-1 rounded-full">
                  <EllipsisVertical />
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <div className="text-3xl font-semibold mt-2 flex gap-x-2 items-center">
                  {driver.stats.avgRating}
                  <Star className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Details */}
            <div className="bg-white rounded-2xl  p-4">
              <div className="text-base font-semibold mb-3">Vehicle Detail</div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
                  <div className="text-gray-500">License Plate Number</div>
                  <div className="text-black text-right font-semibold">
                    {driver.vehicle.license}
                  </div>
                  <div className="text-gray-500">Vehicle Type</div>
                  <div className="text-black text-right font-semibold">
                    {driver.vehicle.type}
                  </div>
                  <div className="text-gray-500">Vehicle Color</div>
                  <div className="text-black text-right font-semibold">
                    {driver.vehicle.color}
                  </div>
                  <div className="text-gray-500 ">Year of Manufactured</div>
                  <div className="text-black text-right font-semibold">
                    {driver.vehicle.year}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={carImage}
                    alt="vehicle"
                    className="max-h-40 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Reviews / Feedback */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-base font-semibold">
                  Reviews / Feedback
                </div>
                <div className="flex items-center gap-x-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>0/0</span>
                    <div className="p-1 border rounded-lg cursor-pointer hover:bg-gray-200">
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                    <div className="p-1 border rounded-lg cursor-pointer hover:bg-gray-200">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-primary p-1 rounded-full cursor-pointer hover:bg-primary/80">
                    <X className="text-white w-4 h-4" />
                  </div>
                </div>
              </div>
              {hasRatings ? (
                <div className="text-sm">Ratings content here</div>
              ) : (
                <EmptyState
                  icon={<Star className="w-6 h-6" />}
                  title="No reviews yet"
                />
              )}
            </div>

            {/* Tabs: Trip History / Withdrawal / Rating & Feedback */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-between border border-bordercolor rounded-xl p-1 w-full">
                  <button
                    className={`px-3 py-1 rounded-lg w-full ${
                      activeDetailTab === "trips"
                        ? "bg-primary/20 text-primary"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveDetailTab("trips")}
                  >
                    Trip History
                  </button>
                  <button
                    className={`px-3 py-1 rounded-lg w-full ${
                      activeDetailTab === "withdrawals"
                        ? "bg-primary/20 text-primary"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveDetailTab("withdrawals")}
                  >
                    Withdrawal
                  </button>
                  <button
                    className={`px-3 py-1 rounded-lg w-full ${
                      activeDetailTab === "ratings"
                        ? "bg-primary/20 text-primary"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveDetailTab("ratings")}
                  >
                    Rating & Feedback
                  </button>
                </div>
              </div>

              {activeDetailTab === "trips" &&
                (hasTrips ? (
                  <div className="text-sm">Trips content here</div>
                ) : (
                  <EmptyState
                    icon={<User className="w-6 h-6" />}
                    title="No trips yet"
                  />
                ))}

              {activeDetailTab === "withdrawals" &&
                (hasWithdrawals ? (
                  <div className="text-sm">Withdrawals content here</div>
                ) : (
                  <EmptyState
                    icon={<Tags className="w-6 h-6" />}
                    title="No withdrawals yet"
                  />
                ))}

              {activeDetailTab === "ratings" &&
                (hasRatings ? (
                  <div className="text-sm">Ratings content here</div>
                ) : (
                  <EmptyState
                    icon={<Star className="w-6 h-6" />}
                    title="No ratings yet"
                  />
                ))}
            </div>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border p-4">
              <div className="flex  justify-center">
                <div className="">
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto"
                  />
                  <div className="flex text-center items-center gap-3">
                    <div>
                      <div className="font-semibold">{driver.name}</div>
                      <div className="text-sm text-gray-500">
                        {driver.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gap-2 flex justify-center my-2">
                <div className="bg-gray-200 p-1 rounded-lg">
                  <Phone className="text-gray-600" />
                </div>
                <div className="bg-gray-200 p-1 rounded-lg">
                  <MessageSquare className="text-gray-600" />
                </div>
                <div className="bg-gray-200 p-1 rounded-lg">
                  <Eye className="text-gray-600" />
                </div>
              </div>
              <div className="h-1 w-full bg-gray-200 my-4" />
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">Phone Number</span>
                  <span className="ml-auto">{driver.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">User Type</span>
                  <span className="ml-auto">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs">
                      {driver.userType}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">Country</span>
                  <span className="ml-auto">{driver?.country || "-"}</span>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-200 my-4" />
              {/* Documents */}
              <div className="text-base font-semibold mb-3">Documents</div>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.type} className="bg-gray-100 rounded-lg p-2 ">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-x-2 items-center">
                        <Folder strokeWidth={2} className="w-5 h-5" />
                        <div className="font-semibold">{doc.type}</div>
                      </div>
                      {selectedDocument == doc.type ? (
                        <ChevronUp onClick={() => setSelectedDocument(null)} />
                      ) : (
                        <ChevronDown
                          className="text-gray-500"
                          onClick={() => setSelectedDocument(doc.type)}
                        />
                      )}
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        selectedDocument === doc.type
                          ? "max-h-[500px] mt-2"
                          : "max-h-0"
                      }`}
                    >
                      <img
                        className="w-full rounded-lg mt-2"
                        src={doc.url}
                        alt={doc.type}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DriverPage;
