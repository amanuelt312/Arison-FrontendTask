export interface ServiceItem {
  _id: string;
  name: string;
  logo?: string;
  isActive?: boolean;
  country?: string;
}

export interface ServicesResponse {
  status: string;
  data: ServiceItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
