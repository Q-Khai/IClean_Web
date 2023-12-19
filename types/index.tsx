import React from "react";

export interface CommonReduxAction {
  type: string;
}

export interface CommonReactProps {
  children: React.ReactNode;
}

export interface IAccountInfo {
  data: any;
  accessToken?: string;
  refreshToken?: string;
  userInformationDto?: {
    fullName: string;
    phoneNumber: string | null;
    roleName: string;
    dateOfBirth: string;
    defaultAddress: string | null;
    avatar: string | null;
    isNewUser: boolean;
  };
}
