export interface UserDetailResponse {
  success: boolean;
  data: {
    user: {
      _id: string;
      fullName: string;
      email: string;
      mobileNumber: string;
      role: string;
      status: string;
      createdAt: string;
    };
    stats: {
      totalTrips: number;
      completedTrips: number;
      totalSpent: number;
      avgRating: number;
      lastTrip: string | null;
    };
    roleSpecificData: {
      driverProfile: {
        driverStatus: string;
        email: string;
        vehicleDetails?: {
          vehicleModel?: string;
          vehicleColor?: string;
          PlateNumber?: string;
          licenseNumber?: string;
          ManfacturedYear?: number;
          numberOfSeat?: number;
        };
        serviceType?: string[];
        currentLocation?: {
          type: string;
          coordinates: [number, number];
        };
        onlineStatus?: boolean;
        availability?: string;
        overallRating?: number;
        performanceMetrics?: {
          acceptanceRate: string;
          totalTripsCompleted: number;
          totalTripsRequested: number;
        };
      };
      earnings?: {
        totalEarnings: number;
        totalCommission: number;
        netEarnings: number;
        averageCommissionRate: number;
        currentBalance: number;
      };
      withdrawalHistory?: unknown[];
      ratings?: {
        averageRating: number;
        totalRatings: number;
        ratingsHistory: unknown[];
      };
      documents?: Array<{
        type: string;
        status: string;
        verifiedAt?: string | null;
        notes?: string | null;
        url: string;
      }>;
      trips?: {
        totalTrips: number;
        completedTrips: number;
        recentTrips: unknown[];
      };
      reviewedAt?: string;
      reviewedBy?: string;
      resubmissionInfo?: {
        totalResubmissions: number;
      };
    };
  };
}
