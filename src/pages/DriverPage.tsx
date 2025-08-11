import { useState, type FC } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  EllipsisVertical,
  Eye,
  FileUp,
  Folder,
  MapPin,
  MessageSquare,
  MoreVertical,
  Phone,
  Star,
  Tags,
  User,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { StatCard, type StatCardProps } from "../components/dashboard/StatCard";
import { Header } from "../components/ui/Header";

const DriverPage: FC = () => {
  const { id } = useParams();
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const docments = [
    {
      name: "Natinal ID",
      imageUrl:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Driving License",
      imageUrl:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Natinal ID",
      imageUrl:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Natinal ID",
      imageUrl:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=800&auto=format&fit=crop",
    },
  ];
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  // Mocked driver data for UI demo
  const driver = {
    id: id ?? "29RKASJ",
    name: "Esmail Abdulkadir",
    email: "esmail1@gmail.com",
    phone: "+251987654321",
    avatar: "https://i.pravatar.cc/80?img=11",
    country: "Kenya",
    userType: "Ride",
    stats: {
      totalTrips: 291,
      totalEarning: "Birr 120,230",
      totalWithdrawal: "Birr 30,400",
      avgRating: 4.5,
    },
    vehicle: {
      license: "03 A32570",
      type: "Economy",
      color: "White",
      year: "2003",
    },
  };

  const trips = [
    {
      riderId: `#${driver.id}`,
      pickup: "Furi",
      destination: "Kentere",
      date: "12-09-2024",
      time: "At 8:25 PM",
      amount: "Cash/270 birr",
    },
    {
      riderId: `#${driver.id}`,
      pickup: "Adama",
      destination: "Addis Aba...",
      date: "12-09-2024",
      time: "At 8:25 PM",
      amount: "MP/270 birr",
    },
    {
      riderId: `#${driver.id}`,
      pickup: "Bole",
      destination: "Mexico",
      date: "12-09-2024",
      time: "At 8:25 PM",
      amount: "Air/270 birr",
    },
  ];
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

  const isFirstPage = true;
  const isLastPage = false;

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
                  4.5
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
                    src="https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=800&auto=format&fit=crop"
                    alt="vehicle"
                    className="max-h-40 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-base font-semibold">
                  Reviews / Feedback
                </div>
                <div className="flex items-center gap-x-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>1/5</span>
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

              <div className="">
                <img
                  src="https://i.pravatar.cc/48?img=14"
                  alt="reviewer"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 mt-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Problem with Arriving</div>
                      <span className="text-xs bg-green-100 text-green-700 rounded-md px-2 py-0.5">
                        New
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Aug 11 2023, At 09:30
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    Lorem ipsum dolor sit amet consectetur. Sollicitudin varius
                    et erat egestas. Nisi vulputate dolor dignissim elementum
                    posuere aliquam. Praesent aliquam viverra tristique
                    convallis eu. Diam turpis nunc mauris auctor dignissim a
                    elementum massa.
                  </p>
                </div>
              </div>
            </div>

            {/* Trip History Tabs */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-between border border-bordercolor rounded-xl p-1 w-full">
                  <button className="px-3 py-1 rounded-lg bg-primary/20 hover:bg-primary/10 text-primary font-semibold cursor-pointer w-full">
                    Trip History
                  </button>
                  <button className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 w-full">
                    Withdrawal
                  </button>
                  <button className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 w-full">
                    Rating & Feedback
                  </button>
                </div>
              </div>
              <div className="flex w-full justify-between mb-4">
                <div className="">
                  <h3 className="text-base font-semibold">
                    Complete Trip History
                  </h3>
                  <h2 className="text-bordercolor">
                    View all your clients information.
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-2 border border-gray-400 shadow p-2 rounded-xl cursor-pointer hover:bg-gray-100">
                    <CalendarDays className="h-4 w-4" />

                    <span className="text-sm">Aug 04 - Aug 11 2023</span>
                  </div>
                  <div className="flex items-center gap-2 border border-gray-400 shadow p-2 rounded-xl cursor-pointer hover:bg-gray-100">
                    <FileUp className="h-4 w-4" />
                    <span className="text-sm">Export</span>
                  </div>
                </div>
              </div>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-gray-500">
                    <tr className="text-left">
                      <th className="py-3 px-2 w-10 rounded-tl-xl">
                        <input type="checkbox" />
                      </th>
                      <Header
                        label="Rider ID"
                        sortable
                        isActive={sortField == "riderId"}
                        onClick={() => handleSort("riderId")}
                      />
                      <Header
                        label="Pickup"
                        sortable
                        isActive={sortField == "pickup"}
                        onClick={() => handleSort("pickup")}
                      />
                      <Header
                        label="Destination"
                        sortable
                        isActive={sortField == "destination"}
                        onClick={() => handleSort("destination")}
                      />
                      <Header
                        label="Date"
                        sortable
                        isActive={sortField == "date"}
                        onClick={() => handleSort("date")}
                      />
                      <Header
                        label="Time"
                        sortable
                        isActive={sortField === "time"}
                        onClick={() => handleSort("time")}
                      />
                      <Header
                        label="Ammount"
                        sortable
                        isActive={sortField === "ammount"}
                        onClick={() => handleSort("ammount")}
                        className="rounded-tr-xl"
                      />
                      <th className="py-3 px-2 rounded-tr-xl"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {trips.map((t, i) => (
                      <tr key={i} className="text-gray-700">
                        <td className="py-3 px-2">
                          <input type="checkbox" />
                        </td>
                        <td className="py-3 px-2 text-primary">{t.riderId}</td>
                        <td className="py-3 px-2">{t.pickup}</td>
                        <td className="py-3 px-2">{t.destination}</td>
                        <td className="py-3 px-2">{t.date}</td>
                        <td className="py-3 px-2">{t.time}</td>
                        <td className="py-3 px-2">{t.amount}</td>
                        <td className="py-3 px-2">
                          <MoreVertical className="text-bordercolor hover:bg-gray-100  rounded-full cursor-pointer" />
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
                  <span className="ml-auto">{driver.country}</span>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-200 my-4" />
              {/* Documents */}
              <div className="text-base font-semibold mb-3">Documents</div>
              <div className="space-y-2">
                {docments.map((item) => (
                  <div className="bg-gray-100 rounded-lg p-2 ">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-x-2 items-center">
                        <Folder strokeWidth={2} className="w-5 h-5" />
                        <div className="font-semibold">{item.name}</div>
                      </div>
                      {selectedDocument == item.name ? (
                        <ChevronUp onClick={() => setSelectedDocument(null)} />
                      ) : (
                        <ChevronDown
                          className="text-gray-500"
                          onClick={() => setSelectedDocument(item.name)}
                        />
                      )}
                    </div>
                    {/* {selectedDocument == item.name && ( */}
                    <div
                      className={`
      overflow-hidden
      transition-all duration-500 ease-in-out
      ${selectedDocument === item.name ? "max-h-[500px] mt-2" : "max-h-0"}
    `}
                    >
                      <img
                        className="w-full rounded-lg mt-2"
                        src={item.imageUrl}
                        alt="license"
                      />
                    </div>
                    {/* )} */}
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
