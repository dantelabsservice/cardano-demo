export interface Trail {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert' | 'Extreme';
  location: string;
  length: number;
  elevation: number;
  requiresBadge?: boolean;
}

export interface CheckInData {
  trailId: string;
  trailName: string;
  checkInTime: string;
  difficulty: string;
  walletAddress: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  transaction?: any;
  metadata?: any;
}