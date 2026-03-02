// Used in Repository
export interface CreateUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

// Used in Controller & Service
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
}
