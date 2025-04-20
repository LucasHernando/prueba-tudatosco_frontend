export interface LoginResponse {
    data: {
      access_token: string;
      email: string;
    };
    errors: any;
    message: string;
    status: number;
  }


export interface UserProfile {
    active: boolean;
    email: string;
    events: {
      id: number;
      title: string;
      description: string;
      start_date: string;
      end_date: string;
      capacity: number;
      status: string;
      created_at: string;
    }[];
    roles: { name: string }[];
  }
  