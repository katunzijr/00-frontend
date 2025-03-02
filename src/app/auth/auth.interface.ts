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

export interface SignInUserInterface {
  username?: string,
  email: string,
  password: string,
}

export interface SignUpUserInterface{
  username: string,
  email: string,
  password1: string,
  password2: string,
}

export interface ResetPasswordInterface {
  new_password1: string,
  new_password2: string,
  uid: string,
  token: string,
}
