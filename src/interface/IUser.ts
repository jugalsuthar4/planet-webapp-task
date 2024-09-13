export interface IUser {
  username: string;
  email: string;
  gender: string;
}
export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  birthDate: string;
  refreshToken: string;
  description: string;
}

export interface ICreateUser {
  firstName: string;
  email: string;
  gender: string;
  birthDate: string;
  password: string;
  username: string;
  description: string;
}

export interface ICreateUserError {
  username:boolean;
  password:IPasswordValidation;
  email:boolean;
  gender:boolean;
  birthDate:boolean;
  name:boolean;
}

export type IUpdateUser=Omit<ICreateUser,"password">
export type IUpdateUserError=Omit<ICreateUserError,"password">

export interface IPasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}
