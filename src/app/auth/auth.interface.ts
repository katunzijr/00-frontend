export interface AuthenticatedUser{
  pk: string,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  designation: string,
  avatar: string,
}

export interface TokenResponse {
  access: string;
  refresh: string;
  user: AuthenticatedUser;
}
