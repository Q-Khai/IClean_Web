import {IDataWithMeta, fetcher} from "@app/api/Fetcher";

export interface IInfoUser {
  status: string;
  message: string;
  data: IUserData;
}

export interface IUserData {
  fullName: string;
  phoneNumber: string;
  roleName: string;
  dateOfBirth: string;
  defaultAddress: string;
  avatar: string;
  isRegistration: boolean;
}

export interface IInfoUserData {
  fullName: string;
  dateOfBirth: string;
  fileImage: string;
}

const path = {
  getProfile: "/profile",
  getInfoUser: "/profile",
  updateProfile: "/profile",
};

// Define the interface for the update profile request body
export interface IUpdateProfileData {
  fullName: string;
  dateOfBirth: string;
  fileImage?: string;
}

function getInfoUser(): Promise<IInfoUser> {
  return fetcher({
    url: path.getInfoUser,
    method: "get",
  });
}

function updateInfoUser(body: IInfoUserData): Promise<IInfoUser> {
  return fetcher({
    url: path.getInfoUser,
    method: "put",
    data: body,
  });
}

export {getInfoUser, updateInfoUser};
