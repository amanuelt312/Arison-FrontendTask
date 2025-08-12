export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status?: string;
  profilePicture?: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number; // seconds
  user: User;
}

export interface RefreshResponse {
  success: boolean;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
}
