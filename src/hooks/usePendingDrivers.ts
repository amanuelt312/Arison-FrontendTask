import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export type OnboardingDocument = {
  type: string;
  documentType?: string | null;
  url: string;
  verificationStatus?: string;
  _id: string;
  verifiedAt?: string | null;
  verifiedBy?: string | null;
  notes?: string | null;
};

export type PendingDriver = {
  _id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  profilePicture?: string | null;
  createdAt: string;
  driverProfile?: {
    vehicleDetails?: {
      vehicleModel?: string;
      vehicleColor?: string;
      PlateNumber?: string;
      licenseNumber?: string;
      ManfacturedYear?: number;
      numberOfSeat?: number;
    };
    onboardingDocuments?: OnboardingDocument[];
    driverStatus?: string;
    rejectionReason?: string | null;
    reviewedAt?: string | null;
    reviewedBy?: string | null;
  };
};

export type PendingDriversResponse = {
  success: boolean;
  data: {
    drivers: PendingDriver[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalDrivers: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
};

export function usePendingDrivers({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return useQuery({
    queryKey: ["pendingDrivers", { page, limit }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      const res = await apiFetch<PendingDriversResponse>(
        `/api/v1/admin/drivers/pending?${params.toString()}`
      );
      return res.data;
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
