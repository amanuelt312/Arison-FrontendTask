export interface VehicleDetails {
  vehicleModel?: string;
  vehicleColor?: string;
  PlateNumber?: string;
  licenseNumber?: string;
  ManfacturedYear?: number;
  numberOfSeat?: number;
}

export interface UserListItem {
  _id: string;
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  role: string;
  status: string;
  createdAt: string;
  driverStatus?: string | null;
  serviceType?: string[] | null;
  vehicleDetails?: VehicleDetails | Record<string, never>;
  rating?: number;
}

export interface UsersListResponse {
  success: boolean;
  data: {
    users: UserListItem[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    filters?: {
      applied?: Record<string, unknown>;
      summary?: {
        totalUsers: number;
        drivers: number;
        riders: number;
        activeUsers: number;
        averageRating: number;
      };
    };
  };
}
